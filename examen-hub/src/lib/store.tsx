"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedFlashcards } from "./data";
import type { AreaId, CardProgress, Flashcard, Rating } from "./types";

const STORAGE_KEY = "examen-hub:v1";
const DAY = 24 * 60 * 60 * 1000;
export const MASTERED_INTERVAL = 7; // Tage

export interface QuizResult {
  score: number; // 0..1
  best: number; // 0..1
  attempts: number;
  lastAt: number;
}

interface PersistedState {
  customCards: Flashcard[];
  edits: Record<string, Pick<Flashcard, "front" | "back">>;
  deleted: string[];
  progress: Record<string, CardProgress>;
  quiz: Record<string, QuizResult>;
}

const emptyState: PersistedState = { customCards: [], edits: {}, deleted: [], progress: {}, quiz: {} };

export type CardStatus = "new" | "learning" | "mastered";

export function cardStatus(p?: CardProgress): CardStatus {
  if (!p || p.reps === 0 && !p.lastReviewed) return "new";
  if (p.interval >= MASTERED_INTERVAL && p.last !== "again") return "mastered";
  return "learning";
}

export function isDue(p: CardProgress | undefined, now = Date.now()) {
  return !p || p.due <= now;
}

/** Vereinfachter SM-2-Algorithmus mit drei Bewertungsstufen. */
export function schedule(prev: CardProgress | undefined, rating: Rating, now = Date.now()): CardProgress {
  const p: CardProgress = prev ?? { reps: 0, interval: 0, ease: 2.5, due: now };
  if (rating === "again") {
    return { reps: 0, interval: 0, ease: Math.max(1.3, p.ease - 0.2), due: now + 60 * 1000, last: rating, lastReviewed: now };
  }
  let interval: number;
  let ease = p.ease;
  if (rating === "hard") {
    interval = p.reps === 0 ? 1 : Math.max(1, Math.round(p.interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
  } else {
    interval = p.reps === 0 ? 1 : p.reps === 1 ? 3 : Math.round(p.interval * ease);
    ease = Math.min(3, ease + 0.05);
  }
  return { reps: p.reps + 1, interval, ease, due: now + interval * DAY, last: rating, lastReviewed: now };
}

export function formatInterval(days: number) {
  if (days <= 0) return "< 1 Min.";
  if (days === 1) return "1 Tag";
  if (days < 30) return `${days} Tage`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 Monat" : `${months} Monate`;
}

interface StudyContextValue {
  ready: boolean;
  cards: Flashcard[];
  progress: Record<string, CardProgress>;
  quiz: Record<string, QuizResult>;
  rate: (cardId: string, rating: Rating) => void;
  addCard: (card: Omit<Flashcard, "id" | "custom">) => Flashcard;
  updateCard: (id: string, data: Partial<Pick<Flashcard, "front" | "back" | "areaId" | "subareaId" | "topicId">>) => void;
  deleteCard: (id: string) => void;
  resetCardProgress: (scope?: { areaId?: AreaId }) => void;
  saveQuizResult: (topicId: string, score: number) => void;
  resetAll: () => void;
}

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...emptyState, ...JSON.parse(raw) });
    } catch {
      /* ignorieren – Start mit leerem Zustand */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Speicher nicht verfügbar */
    }
  }, [state, ready]);

  const cards = useMemo(() => {
    const deleted = new Set(state.deleted);
    const seeds = seedFlashcards
      .filter((c) => !deleted.has(c.id))
      .map((c) => (state.edits[c.id] ? { ...c, ...state.edits[c.id] } : c));
    return [...seeds, ...state.customCards.filter((c) => !deleted.has(c.id))];
  }, [state.customCards, state.edits, state.deleted]);

  const rate = useCallback((cardId: string, rating: Rating) => {
    setState((s) => ({ ...s, progress: { ...s.progress, [cardId]: schedule(s.progress[cardId], rating) } }));
  }, []);

  const addCard = useCallback((card: Omit<Flashcard, "id" | "custom">) => {
    const newCard: Flashcard = { ...card, id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, custom: true };
    setState((s) => ({ ...s, customCards: [...s.customCards, newCard] }));
    return newCard;
  }, []);

  const updateCard: StudyContextValue["updateCard"] = useCallback((id, data) => {
    setState((s) => {
      const custom = s.customCards.find((c) => c.id === id);
      if (custom) {
        return { ...s, customCards: s.customCards.map((c) => (c.id === id ? { ...c, ...data } : c)) };
      }
      const seed = seedFlashcards.find((c) => c.id === id);
      if (!seed) return s;
      const prev = s.edits[id] ?? { front: seed.front, back: seed.back };
      return { ...s, edits: { ...s.edits, [id]: { front: data.front ?? prev.front, back: data.back ?? prev.back } } };
    });
  }, []);

  const deleteCard = useCallback((id: string) => {
    setState((s) => {
      const { [id]: _removed, ...progress } = s.progress;
      if (s.customCards.some((c) => c.id === id)) {
        return { ...s, progress, customCards: s.customCards.filter((c) => c.id !== id) };
      }
      return { ...s, progress, deleted: [...s.deleted, id] };
    });
  }, []);

  const resetCardProgress = useCallback(
    (scope?: { areaId?: AreaId }) => {
      setState((s) => {
        if (!scope?.areaId) return { ...s, progress: {} };
        const ids = new Set(cards.filter((c) => c.areaId === scope.areaId).map((c) => c.id));
        return { ...s, progress: Object.fromEntries(Object.entries(s.progress).filter(([k]) => !ids.has(k))) };
      });
    },
    [cards],
  );

  const saveQuizResult = useCallback((topicId: string, score: number) => {
    setState((s) => {
      const prev = s.quiz[topicId];
      return {
        ...s,
        quiz: {
          ...s.quiz,
          [topicId]: { score, best: Math.max(score, prev?.best ?? 0), attempts: (prev?.attempts ?? 0) + 1, lastAt: Date.now() },
        },
      };
    });
  }, []);

  const resetAll = useCallback(() => setState(emptyState), []);

  const value = useMemo(
    () => ({ ready, cards, progress: state.progress, quiz: state.quiz, rate, addCard, updateCard, deleteCard, resetCardProgress, saveQuizResult, resetAll }),
    [ready, cards, state.progress, state.quiz, rate, addCard, updateCard, deleteCard, resetCardProgress, saveQuizResult, resetAll],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy muss innerhalb von <StudyProvider> verwendet werden");
  return ctx;
}

export function summarize(cards: Flashcard[], progress: Record<string, CardProgress>, now = Date.now()) {
  let fresh = 0, learning = 0, mastered = 0, due = 0;
  for (const c of cards) {
    const p = progress[c.id];
    const st = cardStatus(p);
    if (st === "new") fresh++;
    else if (st === "learning") learning++;
    else mastered++;
    if (p && p.due <= now) due++;
  }
  return { total: cards.length, fresh, learning, mastered, due, open: fresh + due };
}
