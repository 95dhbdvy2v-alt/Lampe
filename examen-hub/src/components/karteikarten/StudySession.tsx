"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Keyboard, Pencil, PartyPopper, RotateCw, Repeat } from "lucide-react";
import { areaById, subareaById, topicById } from "@/lib/data";
import type { Rating } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { formatInterval, isDue, schedule, useStudy } from "@/lib/store";
import { AreaPill, ProgressBar } from "@/components/ui";
import { CardEditor } from "./CardEditor";

const ratingMeta: Record<Rating, { label: string; key: string; cls: string }> = {
  again: { label: "Nochmal", key: "1", cls: "border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20" },
  hard: { label: "Schwer", key: "2", cls: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20" },
  good: { label: "Gewusst", key: "3", cls: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20" },
};

export function StudySession() {
  const params = useSearchParams();
  const gebiet = params.get("gebiet");
  const bereich = params.get("bereich");
  const thema = params.get("thema");
  const all = params.get("modus") === "alle";
  const { ready, cards, progress, rate } = useStudy();

  const scopeLabel = thema ? topicById(thema)?.title : bereich ? subareaById(bereich)?.name : gebiet ? areaById(gebiet)?.name : "Alle Rechtsgebiete";
  const scoped = useMemo(
    () => cards.filter((c) => (!gebiet || c.areaId === gebiet) && (!bereich || c.subareaId === bereich) && (!thema || c.topicId === thema)),
    [cards, gebiet, bereich, thema],
  );

  const [queue, setQueue] = useState<string[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [counts, setCounts] = useState<Record<Rating, number>>({ again: 0, hard: 0, good: 0 });
  const [editing, setEditing] = useState(false);
  const [initialSize, setInitialSize] = useState(0);

  // Warteschlange einmalig aufbauen, sobald der lokale Speicher geladen ist
  useEffect(() => {
    if (!ready || queue !== null) return;
    const now = Date.now();
    const pick = all ? scoped : scoped.filter((c) => isDue(progress[c.id], now));
    const sorted = [...pick].sort((a, b) => {
      const pa = progress[a.id], pb = progress[b.id];
      if (!!pa !== !!pb) return pa ? -1 : 1; // fällige Wiederholungen vor neuen Karten
      return (pa?.due ?? 0) - (pb?.due ?? 0);
    });
    setQueue(sorted.map((c) => c.id));
    setInitialSize(sorted.length);
  }, [ready, queue, all, scoped, progress]);

  const current = queue && queue.length ? cards.find((c) => c.id === queue[0]) : undefined;

  const answer = (r: Rating) => {
    if (!current || !queue) return;
    rate(current.id, r);
    setCounts((c) => ({ ...c, [r]: c[r] + 1 }));
    setFlipped(false);
    setQueue(r === "again" ? [...queue.slice(1), current.id] : queue.slice(1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (editing || !current) return;
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped) {
        const r = (Object.keys(ratingMeta) as Rating[]).find((k) => ratingMeta[k].key === e.key);
        if (r) answer(r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const reviewed = counts.again + counts.hard + counts.good;
  const doneUnique = initialSize - (queue?.length ?? 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-14 z-20 border-b border-ink-200 bg-white/90 backdrop-blur lg:top-0 dark:border-ink-800 dark:bg-ink-900/90">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3 sm:px-8">
          <Link href="/karteikarten" className="btn-ghost p-2" aria-label="Zurück">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="label">Lernsession</p>
            <p className="truncate font-serif font-semibold">{scopeLabel}</p>
          </div>
          {queue && initialSize > 0 && (
            <div className="w-40">
              <div className="mb-1 flex justify-between text-[11px] tabular-nums text-ink-500">
                <span>{doneUnique}/{initialSize}</span>
                <span>{queue.length} übrig</span>
              </div>
              <ProgressBar value={initialSize ? doneUnique / initialSize : 0} />
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        {!ready || queue === null ? (
          <div className="card h-72 animate-pulse" />
        ) : current ? (
          <>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-ink-500">
                <AreaPill areaId={current.areaId} />
                <span>{subareaById(current.subareaId)?.name}</span>
                {current.topicId && <span className="hidden sm:inline">· {topicById(current.topicId)?.title}</span>}
              </div>
              <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" /> Bearbeiten
              </button>
            </div>

            <button className="flip block w-full text-left" onClick={() => setFlipped((f) => !f)} aria-label="Karte umdrehen">
              <div className={cn("flip-inner grid", flipped && "flipped")}>
                <div className="flip-face card relative flex min-h-[300px] flex-col items-center justify-center p-8 text-center [grid-area:1/1]">
                  <div className={cn("absolute inset-x-0 top-0 h-1 rounded-t-xl", areaStyle[current.areaId].bar)} />
                  <span className="label absolute left-5 top-4">Frage</span>
                  <p className="whitespace-pre-line font-serif text-xl font-semibold leading-snug sm:text-2xl">{current.front}</p>
                  <span className="absolute bottom-4 flex items-center gap-1 text-xs text-ink-400">
                    <RotateCw className="h-3 w-3" /> Klicken oder Leertaste zum Umdrehen
                  </span>
                </div>
                <div className="flip-face flip-back card relative flex min-h-[300px] flex-col justify-center p-8 [grid-area:1/1]">
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-emerald-500" />
                  <span className="label absolute left-5 top-4">Antwort</span>
                  <p className="mb-3 whitespace-pre-line text-sm font-medium text-ink-500">{current.front}</p>
                  <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-ink-800 dark:text-ink-100">{current.back}</p>
                </div>
              </div>
            </button>

            <div className="mt-6">
              {flipped ? (
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(ratingMeta) as Rating[]).map((r) => {
                    const next = schedule(progress[current.id], r);
                    return (
                      <button key={r} onClick={() => answer(r)} className={cn("flex flex-col items-center rounded-xl border px-3 py-3 transition", ratingMeta[r].cls)}>
                        <span className="text-sm font-semibold">{ratingMeta[r].label}</span>
                        <span className="text-[11px] opacity-75">{formatInterval(next.interval)}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <button className="btn-primary w-full py-3" onClick={() => setFlipped(true)}>
                  Antwort zeigen
                </button>
              )}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-400">
                <Keyboard className="h-3.5 w-3.5" /> Leertaste: umdrehen · 1: Nochmal · 2: Schwer · 3: Gewusst
              </p>
            </div>
          </>
        ) : (
          <div className="card px-6 py-12 text-center">
            {reviewed > 0 ? (
              <>
                <PartyPopper className="mx-auto h-10 w-10 text-amber-500" />
                <h2 className="mt-3 font-serif text-2xl font-semibold">Session abgeschlossen!</h2>
                <p className="mt-1 text-sm text-ink-500">{reviewed} Bewertungen in dieser Session.</p>
                <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-2">
                  {(Object.keys(ratingMeta) as Rating[]).map((r) => (
                    <div key={r} className={cn("rounded-lg border px-3 py-2", ratingMeta[r].cls)}>
                      <p className="text-xl font-semibold tabular-nums">{counts[r]}</p>
                      <p className="text-[11px]">{ratingMeta[r].label}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                <h2 className="mt-3 font-serif text-2xl font-semibold">Alles erledigt</h2>
                <p className="mt-1 text-sm text-ink-500">{scoped.length ? "In diesem Bereich sind aktuell keine Karten fällig." : "In diesem Bereich gibt es noch keine Karten."}</p>
              </>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/karteikarten" className="btn-secondary">
                Zum Dashboard
              </Link>
              {scoped.length > 0 && (
                <a
                  href={`/karteikarten/lernen?${new URLSearchParams({ ...(gebiet && { gebiet }), ...(bereich && { bereich }), ...(thema && { thema }), modus: "alle" }).toString()}`}
                  className="btn-primary"
                >
                  <Repeat className="h-4 w-4" /> Alle {scoped.length} Karten wiederholen
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {editing && current && <CardEditor card={current} onClose={() => setEditing(false)} />}
    </div>
  );
}
