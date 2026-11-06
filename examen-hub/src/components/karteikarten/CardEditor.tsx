"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { areas, subareasOf, topicsOfSubarea } from "@/lib/data";
import type { AreaId, Flashcard } from "@/lib/types";
import { useStudy } from "@/lib/store";

export function CardEditor({
  card,
  defaults,
  onClose,
}: {
  card?: Flashcard | null;
  defaults?: { areaId?: AreaId; subareaId?: string; topicId?: string };
  onClose: () => void;
}) {
  const { addCard, updateCard } = useStudy();
  const isSeed = !!card && !card.custom;
  const [areaId, setAreaId] = useState<AreaId>(card?.areaId ?? defaults?.areaId ?? "zivilrecht");
  const [subareaId, setSubareaId] = useState(card?.subareaId ?? defaults?.subareaId ?? subareasOf(card?.areaId ?? defaults?.areaId ?? "zivilrecht")[0].id);
  const [topicId, setTopicId] = useState(card?.topicId ?? defaults?.topicId ?? "");
  const [front, setFront] = useState(card?.front ?? "");
  const [back, setBack] = useState(card?.back ?? "");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = () => {
    if (!front.trim() || !back.trim()) return;
    const data = { areaId, subareaId, topicId: topicId || undefined, front: front.trim(), back: back.trim() };
    if (card) updateCard(card.id, isSeed ? { front: data.front, back: data.back } : data);
    else addCard(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card w-full max-w-xl shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5 dark:border-ink-800">
          <h2 className="font-serif text-lg font-semibold">{card ? "Karteikarte bearbeiten" : "Neue Karteikarte"}</h2>
          <button className="btn-ghost p-1.5" onClick={onClose} aria-label="Schließen">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="label mb-1 block">Rechtsgebiet</span>
              <select
                className="input"
                value={areaId}
                disabled={isSeed}
                onChange={(e) => {
                  const a = e.target.value as AreaId;
                  setAreaId(a);
                  setSubareaId(subareasOf(a)[0].id);
                  setTopicId("");
                }}
              >
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label mb-1 block">Unterkategorie</span>
              <select
                className="input"
                value={subareaId}
                disabled={isSeed}
                onChange={(e) => {
                  setSubareaId(e.target.value);
                  setTopicId("");
                }}
              >
                {subareasOf(areaId).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label mb-1 block">Thema (optional)</span>
              <select className="input" value={topicId} disabled={isSeed} onChange={(e) => setTopicId(e.target.value)}>
                <option value="">– keines –</option>
                {topicsOfSubarea(subareaId).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {isSeed && <p className="-mt-2 text-xs text-ink-400">Vorgegebene Karten behalten ihre Einordnung; Vorder- und Rückseite sind frei anpassbar.</p>}
          <label className="block">
            <span className="label mb-1 block">Vorderseite (Frage)</span>
            <textarea className="input min-h-[80px] resize-y" value={front} onChange={(e) => setFront(e.target.value)} placeholder="z. B. Definition: Gewahrsam" autoFocus />
          </label>
          <label className="block">
            <span className="label mb-1 block">Rückseite (Antwort)</span>
            <textarea className="input min-h-[120px] resize-y font-serif text-[15px]" value={back} onChange={(e) => setBack(e.target.value)} placeholder="Antwort, Definition, Norm …" />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-ink-100 px-5 py-3.5 dark:border-ink-800">
          <button className="btn-secondary" onClick={onClose}>
            Abbrechen
          </button>
          <button className="btn-primary" disabled={!front.trim() || !back.trim()} onClick={save}>
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
