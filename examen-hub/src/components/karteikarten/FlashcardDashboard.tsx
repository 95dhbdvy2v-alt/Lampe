"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarClock, ChevronDown, CircleDot, Layers, Pencil, Play, Plus, RotateCcw, Search, Sparkles, Trash2, Trophy } from "lucide-react";
import { areas, subareaById, subareasOf, topicById } from "@/lib/data";
import type { AreaId, Flashcard } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { cardStatus, summarize, useStudy } from "@/lib/store";
import { PageHeader } from "@/components/ui";
import { CardEditor } from "./CardEditor";

const DAY = 86_400_000;

export function FlashcardDashboard() {
  const { ready, cards, progress, resetCardProgress } = useStudy();
  const [editor, setEditor] = useState<{ card?: Flashcard | null } | null>(null);
  const stats = summarize(cards, progress);

  const forecast = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, i) => ({ date: new Date(start.getTime() + i * DAY), n: 0 }));
    for (const c of cards) {
      const p = progress[c.id];
      if (!p) continue;
      const idx = Math.max(0, Math.floor((p.due - start.getTime()) / DAY));
      if (idx < 7) days[idx].n++;
    }
    return days;
  }, [cards, progress]);
  const maxForecast = Math.max(1, ...forecast.map((d) => d.n));

  return (
    <div>
      <PageHeader
        eyebrow="Spaced Repetition"
        title="Karteikarten"
        description="Wiederhole Definitionen, Schemata und Streitstände im optimalen Abstand. Bewerte jede Karte – der Algorithmus plant die nächste Wiederholung."
        actions={
          <>
            <button className="btn-secondary" onClick={() => setEditor({ card: null })}>
              <Plus className="h-4 w-4" /> Neue Karte
            </button>
            <Link href="/karteikarten/lernen" className={cn("btn-primary", ready && stats.open === 0 && "pointer-events-none opacity-50")}>
              <Play className="h-4 w-4" /> {ready ? `${stats.open} offene Karten lernen` : "Lernen"}
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-8">
        {/* Fortschritts-Dashboard */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile icon={<Layers className="h-4 w-4" />} label="Karten gesamt" value={stats.total} sub={`${cards.filter((c) => c.custom).length} eigene`} ready={ready} />
          <StatTile icon={<CalendarClock className="h-4 w-4" />} label="Heute offen" value={stats.open} sub={`${stats.due} fällig · ${stats.fresh} neu`} ready={ready} accent="text-amber-600 dark:text-amber-400" />
          <StatTile icon={<CircleDot className="h-4 w-4" />} label="In Lernphase" value={stats.learning} sub="Intervall < 7 Tage" ready={ready} />
          <StatTile icon={<Trophy className="h-4 w-4" />} label="Gefestigt" value={stats.mastered} sub={stats.total ? `${Math.round((stats.mastered / stats.total) * 100)} % aller Karten` : "–"} ready={ready} accent="text-emerald-600 dark:text-emerald-400" />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="card p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold">Status pro Rechtsgebiet</h2>
              <Legend />
            </div>
            <div className="space-y-2">
              {areas.map((a) => (
                <AreaProgress key={a.id} areaId={a.id} />
              ))}
            </div>
          </div>
          <div className="card flex flex-col p-5">
            <h2 className="font-serif text-lg font-semibold">Wiederholungen – 7 Tage</h2>
            <p className="text-xs text-ink-500">Bereits bewertete Karten nach Fälligkeit</p>
            <div className="mt-4 flex flex-1 items-end gap-2">
              {forecast.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10px] tabular-nums text-ink-500">{ready ? d.n : ""}</span>
                  <div className="flex h-28 w-full items-end rounded-md bg-ink-50 dark:bg-ink-800/50">
                    <div className={cn("w-full rounded-md", i === 0 ? "bg-amber-400" : "bg-brand-400")} style={{ height: ready ? `${(d.n / maxForecast) * 100}%` : 0 }} />
                  </div>
                  <span className="text-[10px] text-ink-400">{i === 0 ? "Heute" : d.date.toLocaleDateString("de-DE", { weekday: "short" })}</span>
                </div>
              ))}
            </div>
            <button
              className="btn-ghost mt-4 self-start text-xs text-ink-400"
              onClick={() => {
                if (confirm("Gesamten Lernfortschritt der Karteikarten zurücksetzen?")) resetCardProgress();
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" /> Fortschritt zurücksetzen
            </button>
          </div>
        </section>

        <CardManager onEdit={(card) => setEditor({ card })} onNew={() => setEditor({ card: null })} />
      </div>

      {editor && <CardEditor card={editor.card} onClose={() => setEditor(null)} />}
    </div>
  );
}

function StatTile({ icon, label, value, sub, ready, accent }: { icon: React.ReactNode; label: string; value: number; sub: string; ready: boolean; accent?: string }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300">{icon}</span>
        {label}
      </div>
      <p className={cn("mt-3 font-serif text-3xl font-semibold tabular-nums", accent)}>{ready ? value : "–"}</p>
      <p className="mt-0.5 text-xs text-ink-400">{sub}</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex gap-3 text-[11px] text-ink-500">
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-sm bg-ink-600 dark:bg-ink-300" /> gefestigt
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-sm bg-ink-300 dark:bg-ink-600" /> in Lernphase
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-sm bg-ink-100 dark:bg-ink-800" /> neu
      </span>
    </div>
  );
}

function StackedBar({ mastered, learning, total, areaId, thin }: { mastered: number; learning: number; total: number; areaId: AreaId; thin?: boolean }) {
  const s = areaStyle[areaId];
  const pct = (n: number) => (total ? `${(n / total) * 100}%` : "0%");
  return (
    <div className={cn("flex overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800", thin ? "h-1.5" : "h-2.5")}>
      <div className={cn("h-full transition-all", s.bar)} style={{ width: pct(mastered) }} />
      <div className={cn("h-full transition-all", s.barSoft)} style={{ width: pct(learning) }} />
    </div>
  );
}

function AreaProgress({ areaId }: { areaId: AreaId }) {
  const { ready, cards, progress } = useStudy();
  const [open, setOpen] = useState(false);
  const area = areas.find((a) => a.id === areaId)!;
  const list = cards.filter((c) => c.areaId === areaId);
  const st = ready ? summarize(list, progress) : { total: list.length, mastered: 0, learning: 0, fresh: list.length, due: 0, open: list.length };

  return (
    <div className="rounded-lg border border-ink-100 dark:border-ink-800">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3">
        <button className="flex min-w-[170px] items-center gap-2 text-left" onClick={() => setOpen(!open)}>
          <ChevronDown className={cn("h-4 w-4 text-ink-400 transition-transform", !open && "-rotate-90")} />
          <span className={cn("h-2.5 w-2.5 rounded-full", areaStyle[areaId].dot)} />
          <span className="text-sm font-semibold">{area.name}</span>
        </button>
        <div className="min-w-[140px] flex-1">
          <StackedBar mastered={st.mastered} learning={st.learning} total={st.total} areaId={areaId} />
        </div>
        <span className="w-28 text-right text-xs tabular-nums text-ink-500">
          {st.mastered}/{st.total} · {st.total ? Math.round((st.mastered / st.total) * 100) : 0} %
        </span>
        <Link href={`/karteikarten/lernen?gebiet=${areaId}`} className={cn("btn-secondary px-2.5 py-1 text-xs", st.open === 0 && "opacity-50")}>
          <Play className="h-3 w-3" /> {st.open} offen
        </Link>
      </div>
      {open && (
        <ul className="space-y-1 border-t border-ink-100 px-3 py-2 dark:border-ink-800">
          {subareasOf(areaId).map((sub) => {
            const sl = cards.filter((c) => c.subareaId === sub.id);
            const ss = summarize(sl, progress);
            return (
              <li key={sub.id} className="flex items-center gap-3 py-1 pl-8">
                <span className="w-44 truncate text-[13px] text-ink-600 dark:text-ink-300">{sub.name}</span>
                <div className="flex-1">
                  <StackedBar mastered={ss.mastered} learning={ss.learning} total={ss.total} areaId={areaId} thin />
                </div>
                <span className="w-14 text-right text-[11px] tabular-nums text-ink-400">
                  {ss.mastered}/{ss.total}
                </span>
                <Link href={`/karteikarten/lernen?bereich=${sub.id}`} className="text-[11px] font-medium text-brand-600 hover:underline dark:text-brand-300">
                  Lernen
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CardManager({ onEdit, onNew }: { onEdit: (c: Flashcard) => void; onNew: () => void }) {
  const { cards, progress, deleteCard, ready } = useStudy();
  const [area, setArea] = useState<AreaId | "all">("all");
  const [sub, setSub] = useState("all");
  const [status, setStatus] = useState<"all" | "new" | "learning" | "mastered" | "custom">("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cards.filter((c) => {
      if (area !== "all" && c.areaId !== area) return false;
      if (sub !== "all" && c.subareaId !== sub) return false;
      if (status === "custom" && !c.custom) return false;
      if (status !== "all" && status !== "custom" && cardStatus(progress[c.id]) !== status) return false;
      if (needle && !(c.front + " " + c.back).toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [cards, progress, area, sub, status, q]);

  const statusBadge = {
    new: ["Neu", "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300"],
    learning: ["Lernphase", "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200"],
    mastered: ["Gefestigt", "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200"],
  } as const;

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold">Kartenverwaltung</h2>
          <p className="text-sm text-ink-500">Bestehende Karten bearbeiten, löschen oder eigene hinzufügen.</p>
        </div>
        <button className="btn-secondary" onClick={onNew}>
          <Plus className="h-4 w-4" /> Karte hinzufügen
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap gap-2 border-b border-ink-100 p-3 dark:border-ink-800">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input className="input pl-8" placeholder="Karten durchsuchen …" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select
            className="input w-auto"
            value={area}
            onChange={(e) => {
              setArea(e.target.value as AreaId | "all");
              setSub("all");
            }}
          >
            <option value="all">Alle Rechtsgebiete</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <select className="input w-auto" value={sub} onChange={(e) => setSub(e.target.value)} disabled={area === "all"}>
            <option value="all">Alle Unterkategorien</option>
            {area !== "all" &&
              subareasOf(area).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
          <select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="all">Jeder Status</option>
            <option value="new">Neu</option>
            <option value="learning">In Lernphase</option>
            <option value="mastered">Gefestigt</option>
            <option value="custom">Nur eigene Karten</option>
          </select>
        </div>

        <ul className="divide-y divide-ink-100 dark:divide-ink-800">
          {list.slice(0, limit).map((c) => {
            const p = progress[c.id];
            const st = cardStatus(p);
            const [label, cls] = statusBadge[st];
            return (
              <li key={c.id} className="group flex items-start gap-3 px-4 py-3">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", areaStyle[c.areaId].dot)} />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 whitespace-pre-line text-sm font-medium">{c.front}</p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-ink-500">{c.back}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-ink-400">
                    <span>{subareaById(c.subareaId)?.name}</span>
                    {c.topicId && <span>· {topicById(c.topicId)?.title}</span>}
                    {c.custom && <span className="rounded bg-brand-50 px-1 py-px font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">eigene</span>}
                    {ready && p && <span>· fällig {p.due <= Date.now() ? "jetzt" : new Date(p.due).toLocaleDateString("de-DE")}</span>}
                  </div>
                </div>
                {ready && <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold", cls)}>{label}</span>}
                <div className="flex shrink-0 gap-0.5 opacity-60 transition group-hover:opacity-100">
                  <button className="btn-ghost p-1.5" onClick={() => onEdit(c)} aria-label="Bearbeiten" title="Bearbeiten">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="btn-ghost p-1.5 hover:text-rose-600"
                    onClick={() => confirm("Diese Karteikarte löschen?") && deleteCard(c.id)}
                    aria-label="Löschen"
                    title="Löschen"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
          {list.length === 0 && (
            <li className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-ink-500">
              <Sparkles className="h-5 w-5" /> Keine Karten für diese Filter.
            </li>
          )}
        </ul>
        {list.length > limit && (
          <button className="w-full border-t border-ink-100 py-2.5 text-sm font-medium text-brand-600 hover:bg-ink-50 dark:border-ink-800 dark:text-brand-300 dark:hover:bg-ink-800/50" onClick={() => setLimit(limit + 24)}>
            Weitere {Math.min(24, list.length - limit)} von {list.length - limit} anzeigen
          </button>
        )}
      </div>
    </section>
  );
}
