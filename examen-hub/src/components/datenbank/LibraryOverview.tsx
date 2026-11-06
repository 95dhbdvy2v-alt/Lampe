"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, BookMarked, Gavel, Landmark, ListTree, MessageSquareQuote, Search, Scale, ShieldAlert, Sparkles } from "lucide-react";
import { areas, subareaById, subareas, topics } from "@/lib/data";
import type { AreaId, Topic } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { AreaPill, Difficulty, EmptyState, PageHeader } from "@/components/ui";
import { useStudy } from "@/lib/store";

const areaIcons: Record<AreaId, typeof Scale> = {
  zivilrecht: Scale,
  strafrecht: ShieldAlert,
  "oeffentliches-recht": Landmark,
};

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function LibraryOverview() {
  const params = useSearchParams();
  const router = useRouter();
  const area = (params.get("gebiet") as AreaId | null) ?? null;
  const [sub, setSub] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { quiz } = useStudy();

  const setArea = (a: AreaId | null) => {
    setSub(null);
    router.replace(a ? `/datenbank?gebiet=${a}` : "/datenbank", { scroll: false });
  };

  const q = normalize(query.trim());

  const filtered = useMemo(() => {
    return topics.filter((t) => {
      if (area && t.areaId !== area) return false;
      if (sub && t.subareaId !== sub) return false;
      if (!q) return true;
      const hay = normalize(
        [t.title, t.summary, ...t.norms, ...t.definitions.map((d) => d.term + " " + d.text), ...t.disputes.map((d) => d.title), ...t.schemata.map((s) => s.title)].join(" "),
      );
      return hay.includes(q);
    });
  }, [area, sub, q]);

  const definitionHits = useMemo(() => {
    if (q.length < 3) return [];
    return topics
      .filter((t) => !area || t.areaId === area)
      .flatMap((t) => [
        ...t.definitions.filter((d) => normalize(d.term + " " + d.text).includes(q)).map((d) => ({ kind: "Definition" as const, label: d.term, text: d.text, topic: t })),
        ...t.disputes.filter((d) => normalize(d.title + " " + d.problem).includes(q)).map((d) => ({ kind: "Streitstand" as const, label: d.title, text: d.problem, topic: t })),
      ])
      .slice(0, 8);
  }, [q, area]);

  const grouped = useMemo(() => {
    const map = new Map<string, Topic[]>();
    for (const t of filtered) map.set(t.subareaId, [...(map.get(t.subareaId) ?? []), t]);
    return subareas.filter((s) => map.has(s.id)).map((s) => ({ sub: s, items: map.get(s.id)! }));
  }, [filtered]);

  const totals = useMemo(
    () => ({
      schemata: topics.reduce((n, t) => n + t.schemata.length, 0),
      defs: topics.reduce((n, t) => n + t.definitions.length, 0),
      disputes: topics.reduce((n, t) => n + t.disputes.length, 0),
    }),
    [],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Wissens- & Schema-Hub"
        title="Datenbank"
        description="Prüfungsschemata, Definitionen, Streitstände und Kernstrukturen – strukturiert nach Rechtsgebieten und Themenkomplexen."
        actions={
          <div className="hidden gap-5 text-right sm:flex">
            {[
              ["Themen", topics.length],
              ["Schemata", totals.schemata],
              ["Definitionen", totals.defs],
              ["Streitstände", totals.disputes],
            ].map(([l, v]) => (
              <div key={l as string}>
                <div className="font-serif text-xl font-semibold tabular-nums">{v}</div>
                <div className="text-[11px] text-ink-400">{l}</div>
              </div>
            ))}
          </div>
        }
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Themen, Normen, Definitionen oder Streitständen …  (z. B. „Heimtücke“, „§ 985“)"
            className="input h-11 pl-9"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <AreaTab active={!area} onClick={() => setArea(null)} icon={<Sparkles className="h-4 w-4" />} label="Alle Gebiete" count={topics.length} />
          {areas.map((a) => {
            const Icon = areaIcons[a.id];
            return (
              <AreaTab
                key={a.id}
                active={area === a.id}
                onClick={() => setArea(a.id)}
                icon={<Icon className="h-4 w-4" />}
                label={a.name}
                count={topics.filter((t) => t.areaId === a.id).length}
                areaId={a.id}
              />
            );
          })}
        </div>

        {area && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            <SubChip active={!sub} onClick={() => setSub(null)}>
              Alle
            </SubChip>
            {subareas
              .filter((s) => s.areaId === area)
              .map((s) => (
                <SubChip key={s.id} active={sub === s.id} onClick={() => setSub(s.id)}>
                  {s.name}
                </SubChip>
              ))}
          </div>
        )}
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-8">
        {definitionHits.length > 0 && (
          <section>
            <h2 className="label mb-3">Direkte Treffer in Definitionen & Streitständen</h2>
            <div className="card divide-y divide-ink-100 dark:divide-ink-800">
              {definitionHits.map((h, i) => (
                <Link key={i} href={`/datenbank/${h.topic.id}?tab=themen`} className="flex gap-3 px-4 py-3 hover:bg-ink-50 dark:hover:bg-ink-800/50">
                  <span className={cn("mt-0.5 h-fit shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase", h.kind === "Definition" ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200" : "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200")}>
                    {h.kind}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{h.label}</span>
                    <span className="line-clamp-1 block text-sm text-ink-500">{h.text}</span>
                  </span>
                  <span className="ml-auto shrink-0 self-center text-xs text-ink-400">{h.topic.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {grouped.length === 0 && <EmptyState icon={<Search className="h-5 w-5" />} title="Keine Treffer" text="Versuche einen anderen Suchbegriff oder entferne Filter." />}

        {grouped.map(({ sub: s, items }) => (
          <section key={s.id}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", areaStyle[s.areaId].dot)} />
                <h2 className="font-serif text-lg font-semibold">{s.name}</h2>
                <span className="hidden text-sm text-ink-400 sm:inline">· {s.description}</span>
              </div>
              <span className="text-xs text-ink-400">{items.length} Themen</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {items.map((t) => (
                <TopicCard key={t.id} topic={t} quizBest={quiz[t.id]?.best} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function AreaTab({ active, onClick, icon, label, count, areaId }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number; areaId?: AreaId }) {
  const s = areaId ? areaStyle[areaId] : null;
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
        active
          ? "border-ink-900 bg-ink-900 text-white shadow-lift dark:border-white dark:bg-white dark:text-ink-900"
          : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:hover:bg-ink-800",
      )}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", active ? "bg-white/15 dark:bg-ink-900/10" : s ? cn(s.soft, s.text) : "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300")}>{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{label}</span>
        <span className={cn("block text-[11px]", active ? "opacity-70" : "text-ink-400")}>{count} Themen</span>
      </span>
    </button>
  );
}

function SubChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200" : "border-ink-200 text-ink-600 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800",
      )}
    >
      {children}
    </button>
  );
}

function TopicCard({ topic: t, quizBest }: { topic: Topic; quizBest?: number }) {
  const s = areaStyle[t.areaId];
  return (
    <Link href={`/datenbank/${t.id}`} className="card group relative flex flex-col overflow-hidden p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className={cn("absolute inset-x-0 top-0 h-0.5", s.bar)} />
      <div className="flex items-center justify-between gap-2">
        <AreaPill areaId={t.areaId} />
        <span className="text-[11px] text-ink-400">{subareaById(t.subareaId)?.name}</span>
      </div>
      <h3 className="mt-3 font-serif text-[17px] font-semibold leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-300">{t.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{t.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {t.norms.slice(0, 3).map((n) => (
          <span key={n} className="chip">
            {n}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-ink-100 pt-3 text-[11px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
        <Stat icon={<ListTree className="h-3.5 w-3.5" />} n={t.schemata.length} l="Schemata" />
        <Stat icon={<BookMarked className="h-3.5 w-3.5" />} n={t.definitions.length} l="Defs." />
        <Stat icon={<MessageSquareQuote className="h-3.5 w-3.5" />} n={t.disputes.length} l="Streit" />
        <Stat icon={<Gavel className="h-3.5 w-3.5" />} n={t.quiz.length} l="Fälle/Quiz" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Difficulty level={t.difficulty} />
        {quizBest !== undefined ? (
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Quiz: {Math.round(quizBest * 100)} %</span>
        ) : (
          <ArrowRight className="h-4 w-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
        )}
      </div>
    </Link>
  );
}

function Stat({ icon, n, l }: { icon: React.ReactNode; n: number; l: string }) {
  return (
    <span className="flex items-center gap-1" title={l}>
      {icon}
      <span className="font-semibold tabular-nums text-ink-700 dark:text-ink-200">{n}</span>
      <span className="truncate">{l}</span>
    </span>
  );
}
