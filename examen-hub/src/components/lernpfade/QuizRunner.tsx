"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpenCheck, Check, CheckCircle2, ChevronRight, CircleDashed, FileText, Layers, Lightbulb, PenLine, RotateCcw, Trophy, X, XCircle } from "lucide-react";
import { orderedTopics, subareaById } from "@/lib/data";
import type { CaseQuestion, ChoiceQuestion, Question, Topic } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { useStudy } from "@/lib/store";
import { AreaPill, ProgressBar } from "@/components/ui";

interface Answer {
  selected: number[];
  text: string;
  checked: boolean;
  /** Manuelle Selbstkorrektur je Kernpunkt (überschreibt die automatische Erkennung) */
  overrides: Record<number, boolean>;
}

const emptyAnswer = (): Answer => ({ selected: [], text: "", checked: false, overrides: {} });

function norm(s: string) {
  return s.toLowerCase().normalize("NFC");
}

export function detectKeyPoints(q: CaseQuestion, text: string) {
  const t = norm(text);
  return q.keyPoints.map((kp) => kp.keywords.some((k) => t.includes(norm(k))));
}

function scoreOf(q: Question, a: Answer): number {
  if (!a.checked) return 0;
  if (q.type === "case") {
    const auto = detectKeyPoints(q, a.text);
    const hits = q.keyPoints.filter((_, i) => a.overrides[i] ?? auto[i]).length;
    return hits / q.keyPoints.length;
  }
  const correct = new Set(q.correct);
  if (q.type === "single") return a.selected.length === 1 && correct.has(a.selected[0]) ? 1 : 0;
  const right = a.selected.filter((i) => correct.has(i)).length;
  const wrong = a.selected.length - right;
  return Math.max(0, (right - wrong) / correct.size);
}

export function QuizRunner({ topic }: { topic: Topic }) {
  const { saveQuizResult, addCard, cards } = useStudy();
  const questions = topic.quiz;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => questions.map(emptyAnswer));
  const [finished, setFinished] = useState(false);
  const saved = useRef(false);
  const s = areaStyle[topic.areaId];

  const q = questions[index];
  const a = answers[index];

  const update = useCallback((patch: Partial<Answer>) => setAnswers((prev) => prev.map((x, i) => (i === index ? { ...x, ...patch } : x))), [index]);

  const total = useMemo(() => questions.reduce((n, qq, i) => n + scoreOf(qq, answers[i]), 0) / Math.max(1, questions.length), [answers, questions]);

  useEffect(() => {
    if (finished && !saved.current) {
      saved.current = true;
      saveQuizResult(topic.id, total);
    }
  }, [finished, saveQuizResult, topic.id, total]);

  const restart = () => {
    setAnswers(questions.map(emptyAnswer));
    setIndex(0);
    setFinished(false);
    saved.current = false;
  };

  const goNext = () => (index < questions.length - 1 ? setIndex(index + 1) : setFinished(true));
  const canCheck = q && (q.type === "case" ? a.text.trim().length > 0 : a.selected.length > 0);

  // Tastatursteuerung: 1–9 wählt Optionen, Enter prüft / weiter
  useEffect(() => {
    if (finished || !q) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      if (e.key === "Enter") {
        if (a.checked) goNext();
        else if (canCheck) update({ checked: true });
      }
      const n = Number(e.key);
      if (q.type !== "case" && !a.checked && n >= 1 && n <= q.options.length) {
        const i = n - 1;
        update({ selected: q.type === "single" ? [i] : a.selected.includes(i) ? a.selected.filter((x) => x !== i) : [...a.selected, i] });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (questions.length === 0) return null;

  return (
    <div className="min-h-screen">
      <header className="sticky top-14 z-20 border-b border-ink-200 bg-white/90 backdrop-blur lg:top-0 dark:border-ink-800 dark:bg-ink-900/90">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-8">
          <Link href={`/lernpfade?gebiet=${topic.areaId}`} className="btn-ghost p-2" aria-label="Zurück zu den Lernpfaden">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <AreaPill areaId={topic.areaId} />
              <span className="truncate">{subareaById(topic.subareaId)?.name}</span>
            </div>
            <p className="truncate font-serif font-semibold">{topic.title}</p>
          </div>
          <div className="hidden w-48 sm:block">
            <div className="mb-1 flex justify-between text-[11px] text-ink-500">
              <span>{finished ? "Abgeschlossen" : `Aufgabe ${index + 1} von ${questions.length}`}</span>
            </div>
            <div className="flex gap-1">
              {questions.map((qq, i) => {
                const sc = scoreOf(qq, answers[i]);
                return (
                  <button
                    key={qq.id}
                    onClick={() => {
                      setFinished(false);
                      setIndex(i);
                    }}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition",
                      answers[i].checked ? (sc >= 0.75 ? "bg-emerald-500" : sc > 0 ? "bg-amber-400" : "bg-rose-500") : i === index && !finished ? s.bar : "bg-ink-200 dark:bg-ink-700",
                    )}
                    aria-label={`Aufgabe ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        {finished ? (
          <Summary
            topic={topic}
            answers={answers}
            total={total}
            onRestart={restart}
            onReview={(i) => {
              setFinished(false);
              setIndex(i);
            }}
            addWrongAsCards={() => {
              const existing = new Set(cards.map((c) => c.front));
              let added = 0;
              questions.forEach((qq, i) => {
                if (scoreOf(qq, answers[i]) >= 0.75) return;
                const front = qq.snippet ? `${qq.snippet}\n\n${qq.question}` : qq.question;
                if (existing.has(front)) return;
                const back = qq.type === "case" ? qq.solution : `${qq.options.filter((_, oi) => qq.correct.includes(oi)).join("; ")} – ${qq.explanation}`;
                addCard({ areaId: topic.areaId, subareaId: topic.subareaId, topicId: topic.id, front, back });
                added++;
              });
              return added;
            }}
          />
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {q.type === "case" ? <PenLine className="h-3.5 w-3.5" /> : <BookOpenCheck className="h-3.5 w-3.5" />}
              {q.type === "case" ? "Fall-Snippet · Korrektur-Training" : q.type === "multi" ? "Quiz · Mehrfachauswahl" : "Quiz · Einfachauswahl"}
            </div>

            {q.snippet && (
              <div className="mb-4 rounded-xl border-l-4 border-ink-300 bg-white p-5 shadow-card dark:border-ink-600 dark:bg-ink-900">
                <p className="label mb-1.5 flex items-center gap-1.5">
                  <FileText className="h-3 w-3" /> Sachverhalt
                </p>
                <p className="font-serif text-[16px] leading-relaxed text-ink-800 dark:text-ink-100">{q.snippet}</p>
              </div>
            )}
            <h2 className="font-serif text-xl font-semibold leading-snug sm:text-2xl">{q.question}</h2>

            <div className="mt-6">{q.type === "case" ? <CaseTask q={q} a={a} update={update} /> : <ChoiceTask q={q} a={a} update={update} />}</div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-5 dark:border-ink-800">
              <button className="btn-ghost" disabled={index === 0} onClick={() => setIndex(index - 1)}>
                <ArrowLeft className="h-4 w-4" /> Zurück
              </button>
              <div className="flex items-center gap-3">
                {!a.checked && <span className="hidden text-xs text-ink-400 sm:inline">{q.type === "case" ? "" : "Tasten 1–" + q.options.length + " · "}Enter zum Prüfen</span>}
                {!a.checked ? (
                  <>
                    {q.type === "case" && (
                      <button className="btn-ghost text-xs" onClick={() => update({ checked: true })}>
                        Ohne Lösung aufdecken
                      </button>
                    )}
                    <button className="btn-primary" disabled={!canCheck} onClick={() => update({ checked: true })}>
                      <Check className="h-4 w-4" /> {q.type === "case" ? "Mit Musterlösung abgleichen" : "Antwort prüfen"}
                    </button>
                  </>
                ) : (
                  <button className="btn-primary" onClick={goNext}>
                    {index < questions.length - 1 ? "Nächste Aufgabe" : "Auswertung"} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ChoiceTask({ q, a, update }: { q: ChoiceQuestion; a: Answer; update: (p: Partial<Answer>) => void }) {
  const correct = new Set(q.correct);
  const score = scoreOf(q, a);

  return (
    <div>
      {q.type === "multi" && !a.checked && <p className="mb-3 text-sm text-ink-500">Mehrere Antworten können richtig sein.</p>}
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const sel = a.selected.includes(i);
          const isCorrect = correct.has(i);
          let state: "idle" | "sel" | "right" | "wrong" | "missed" = sel ? "sel" : "idle";
          if (a.checked) state = isCorrect ? (sel ? "right" : "missed") : sel ? "wrong" : "idle";
          return (
            <button
              key={i}
              disabled={a.checked}
              onClick={() => update({ selected: q.type === "single" ? [i] : sel ? a.selected.filter((x) => x !== i) : [...a.selected, i] })}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                state === "idle" && "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:hover:bg-ink-800",
                state === "idle" && a.checked && "opacity-60",
                state === "sel" && "border-brand-400 bg-brand-50 ring-1 ring-brand-200 dark:border-brand-500/60 dark:bg-brand-500/10 dark:ring-brand-500/30",
                state === "right" && "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10",
                state === "missed" && "border-dashed border-emerald-400 bg-white dark:bg-ink-900",
                state === "wrong" && "border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center border text-xs font-semibold",
                  q.type === "single" ? "rounded-full" : "rounded-md",
                  state === "sel" ? "border-brand-500 bg-brand-500 text-white" : state === "right" ? "border-emerald-500 bg-emerald-500 text-white" : state === "wrong" ? "border-rose-500 bg-rose-500 text-white" : "border-ink-300 text-ink-500 dark:border-ink-600",
                )}
              >
                {state === "right" ? <Check className="h-3.5 w-3.5" /> : state === "wrong" ? <X className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="flex-1">{opt}</span>
              {state === "missed" && <span className="text-[11px] font-medium text-emerald-600">richtig – nicht gewählt</span>}
            </button>
          );
        })}
      </div>

      {a.checked && (
        <div className="mt-6 space-y-3">
          <div className={cn("flex items-start gap-3 rounded-xl border p-4", score === 1 ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/5" : score > 0 ? "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5" : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/5")}>
            {score === 1 ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" /> : score > 0 ? <CircleDashed className="h-5 w-5 shrink-0 text-amber-600" /> : <XCircle className="h-5 w-5 shrink-0 text-rose-600" />}
            <div>
              <p className="font-semibold">{score === 1 ? "Richtig!" : score > 0 ? `Teilweise richtig (${Math.round(score * 100)} %)` : "Leider falsch."}</p>
              <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">{q.explanation}</p>
            </div>
          </div>
          {q.trap && <Trap items={[q.trap]} />}
        </div>
      )}
    </div>
  );
}

function highlight(text: string, keywords: string[]) {
  if (!text) return null;
  const kws = keywords.filter(Boolean).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!kws.length) return text;
  const re = new RegExp(`(${kws.join("|")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>));
}

function CaseTask({ q, a, update }: { q: CaseQuestion; a: Answer; update: (p: Partial<Answer>) => void }) {
  const auto = detectKeyPoints(q, a.text);
  const hits = q.keyPoints.map((_, i) => a.overrides[i] ?? auto[i]);
  const score = hits.filter(Boolean).length / q.keyPoints.length;
  const allKeywords = q.keyPoints.flatMap((kp) => kp.keywords);

  if (!a.checked) {
    return (
      <div>
        <label className="label mb-2 block">Deine Kurzlösung</label>
        <textarea
          value={a.text}
          onChange={(e) => update({ text: e.target.value })}
          rows={8}
          placeholder="Formuliere eine knappe Lösungsskizze im Gutachtenstil: Obersatz, Definition, Subsumtion, Ergebnis …"
          className="input resize-y font-serif text-[15px] leading-relaxed"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5" /> Tipp: Nenne Normen und Fachbegriffe – sie werden beim Abgleich erkannt.
          </span>
          <span className="tabular-nums">{a.text.trim() ? a.text.trim().split(/\s+/).length : 0} Wörter</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <p className="label mb-2">Deine Lösung</p>
          {a.text.trim() ? (
            <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{highlight(a.text, allKeywords)}</p>
          ) : (
            <p className="text-sm italic text-ink-400">Keine Lösung eingegeben.</p>
          )}
        </div>
        <div className="card border-emerald-200 p-4 dark:border-emerald-500/20">
          <p className="label mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <BookOpenCheck className="h-3.5 w-3.5" /> Musterlösung
          </p>
          <p className="font-serif text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{q.solution}</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-4 py-3 dark:border-ink-800">
          <div>
            <p className="font-semibold">Strukturierter Abgleich: Kernpunkte</p>
            <p className="text-xs text-ink-500">Automatisch erkannt anhand von Schlüsselbegriffen – korrigiere bei Bedarf selbst.</p>
          </div>
          <div className="flex items-center gap-3">
            <ProgressBar value={score} className="w-28" barClass={score >= 0.75 ? "bg-emerald-500" : score >= 0.4 ? "bg-amber-500" : "bg-rose-500"} />
            <span className="text-sm font-semibold tabular-nums">
              {hits.filter(Boolean).length}/{q.keyPoints.length}
            </span>
          </div>
        </div>
        <ul className="divide-y divide-ink-100 dark:divide-ink-800">
          {q.keyPoints.map((kp, i) => (
            <li key={kp.label} className="flex items-center gap-3 px-4 py-2.5">
              {hits[i] ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" /> : <XCircle className="h-5 w-5 shrink-0 text-rose-400" />}
              <span className="flex-1 text-sm">{kp.label}</span>
              {a.overrides[i] !== undefined && <span className="text-[10px] text-ink-400">manuell</span>}
              <button
                onClick={() => update({ overrides: { ...a.overrides, [i]: !hits[i] } })}
                className="rounded-md border border-ink-200 px-2 py-1 text-[11px] text-ink-600 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                {hits[i] ? "Fehlt doch" : "Hab ich sinngemäß"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Trap items={q.traps} />
    </div>
  );
}

function Trap({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-400/5">
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
        <AlertTriangle className="h-4 w-4" /> Typische Klausurfalle{items.length > 1 ? "n" : ""}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-sm text-amber-900 dark:text-amber-100">
            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Summary({
  topic,
  answers,
  total,
  onRestart,
  onReview,
  addWrongAsCards,
}: {
  topic: Topic;
  answers: Answer[];
  total: number;
  onRestart: () => void;
  onReview: (i: number) => void;
  addWrongAsCards: () => number;
}) {
  const [added, setAdded] = useState<number | null>(null);
  const order = orderedTopics(topic.areaId);
  const next = order[order.findIndex((t) => t.id === topic.id) + 1];
  const pct = Math.round(total * 100);
  const wrongCount = topic.quiz.filter((q, i) => scoreOf(q, answers[i]) < 0.75).length;

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden text-center">
        <div className={cn("bg-gradient-to-b px-6 pb-6 pt-8", areaStyle[topic.areaId].gradient)}>
          <Trophy className={cn("mx-auto h-10 w-10", pct >= 80 ? "text-amber-500" : "text-ink-300")} />
          <p className="mt-3 font-serif text-4xl font-semibold tabular-nums">{pct} %</p>
          <p className="mt-1 text-sm text-ink-500">{pct >= 80 ? "Modul abgeschlossen – sehr gut!" : pct >= 50 ? "Solide Basis – wiederhole die markierten Aufgaben." : "Hier lohnt sich eine Wiederholung im Schema."}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 border-t border-ink-100 p-4 dark:border-ink-800">
          <button className="btn-secondary" onClick={onRestart}>
            <RotateCcw className="h-4 w-4" /> Erneut versuchen
          </button>
          <Link href={`/datenbank/${topic.id}`} className="btn-secondary">
            <FileText className="h-4 w-4" /> Schema wiederholen
          </Link>
          {next && (
            <Link href={`/lernpfade/${next.id}`} className="btn-primary">
              Weiter: {next.title} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="card divide-y divide-ink-100 dark:divide-ink-800">
        {topic.quiz.map((q, i) => {
          const sc = scoreOf(q, answers[i]);
          return (
            <button key={q.id} onClick={() => onReview(i)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-ink-50 dark:hover:bg-ink-800/50">
              {sc >= 0.75 ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" /> : sc > 0 ? <CircleDashed className="h-5 w-5 shrink-0 text-amber-500" /> : <XCircle className="h-5 w-5 shrink-0 text-rose-500" />}
              <span className="flex-1 text-sm">{q.question}</span>
              <span className="text-xs tabular-nums text-ink-500">{Math.round(sc * 100)} %</span>
            </button>
          );
        })}
      </div>

      {wrongCount > 0 && (
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            {added === null ? `${wrongCount} Aufgabe(n) nicht sicher gelöst. Als Karteikarten übernehmen und per Spaced Repetition wiederholen?` : added > 0 ? `${added} Karteikarte(n) angelegt.` : "Alle Aufgaben sind bereits als Karten vorhanden."}
          </p>
          {added === null ? (
            <button className="btn-primary" onClick={() => setAdded(addWrongAsCards())}>
              <Layers className="h-4 w-4" /> Als Karteikarten speichern
            </button>
          ) : (
            <Link href={`/karteikarten/lernen?thema=${topic.id}`} className="btn-secondary">
              <Layers className="h-4 w-4" /> Jetzt lernen
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
