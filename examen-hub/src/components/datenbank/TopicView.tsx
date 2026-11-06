"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, BookMarked, Check, ChevronRight, Gavel, Layers, ListTree, MessageSquareQuote, Play, Plus, RotateCcw, Scale } from "lucide-react";
import { areaById, subareaById } from "@/lib/data";
import type { Topic } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { cardStatus, useStudy } from "@/lib/store";
import { AreaPill, Difficulty } from "@/components/ui";
import { SchemaViewer } from "./SchemaViewer";

const tabs = [
  { id: "schemata", label: "Prüfungsschemata", icon: ListTree },
  { id: "themen", label: "Themenblöcke", icon: BookMarked },
  { id: "faelle", label: "Fälle & Quiz", icon: Gavel },
  { id: "karten", label: "Karteikarten", icon: Layers },
] as const;
type TabId = (typeof tabs)[number]["id"];

export function TopicView({ topic }: { topic: Topic }) {
  const params = useSearchParams();
  const router = useRouter();
  const tab = (tabs.find((t) => t.id === params.get("tab"))?.id ?? "schemata") as TabId;
  const { cards, quiz } = useStudy();
  const topicCards = cards.filter((c) => c.topicId === topic.id);
  const s = areaStyle[topic.areaId];
  const result = quiz[topic.id];

  const counts: Record<TabId, number> = {
    schemata: topic.schemata.length,
    themen: topic.definitions.length + topic.disputes.length + topic.structures.length,
    faelle: topic.quiz.length,
    karten: topicCards.length,
  };

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", s.gradient)} />
        <div className="relative mx-auto max-w-5xl px-4 pt-6 sm:px-8 sm:pt-8">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-ink-500">
            <Link href="/datenbank" className="hover:text-ink-900 dark:hover:text-white">
              Datenbank
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/datenbank?gebiet=${topic.areaId}`} className="hover:text-ink-900 dark:hover:text-white">
              {areaById(topic.areaId)?.name}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{subareaById(topic.subareaId)?.name}</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <AreaPill areaId={topic.areaId} />
                <Difficulty level={topic.difficulty} />
              </div>
              <h1 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{topic.title}</h1>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{topic.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {topic.norms.map((n) => (
                  <span key={n} className="chip bg-white/70 dark:bg-ink-800/70">
                    <Scale className="h-3 w-3" />
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/lernpfade/${topic.id}`} className="btn-primary">
                <Play className="h-4 w-4" />
                {result ? `Quiz wiederholen (${Math.round(result.best * 100)} %)` : "Lernpfad starten"}
              </Link>
              <Link href={`/karteikarten/lernen?thema=${topic.id}`} className="btn-secondary">
                <Layers className="h-4 w-4" />
                {topicCards.length} Karten lernen
              </Link>
            </div>
          </div>

          <div className="-mb-px mt-6 flex gap-1 overflow-x-auto scrollbar-thin">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => router.replace(`/datenbank/${topic.id}?tab=${t.id}`, { scroll: false })}
                  className={cn(
                    "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition",
                    active ? cn(s.border, "text-ink-900 dark:text-white") : "border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  <span className="rounded-full bg-ink-100 px-1.5 text-[10px] tabular-nums text-ink-500 dark:bg-ink-800">{counts[t.id]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-8">
        {tab === "schemata" && topic.schemata.map((sc) => <SchemaViewer key={sc.id} schema={sc} />)}
        {tab === "themen" && <ThemeBlocks topic={topic} />}
        {tab === "faelle" && <CaseList topic={topic} />}
        {tab === "karten" && <TopicCards topic={topic} />}
      </div>
    </div>
  );
}

function SectionTitle({ icon, children, count }: { icon: React.ReactNode; children: React.ReactNode; count?: number }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
      <span className="text-ink-400">{icon}</span>
      {children}
      {count !== undefined && <span className="text-sm font-normal text-ink-400">({count})</span>}
    </h2>
  );
}

function ThemeBlocks({ topic }: { topic: Topic }) {
  const { cards, addCard } = useStudy();
  const existing = new Set(cards.map((c) => c.front.trim().toLowerCase()));

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle icon={<BookMarked className="h-4 w-4" />} count={topic.definitions.length}>
          Definitionen
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {topic.definitions.map((d) => {
            const front = `Definition: ${d.term}`;
            const saved = existing.has(front.toLowerCase());
            return (
              <div key={d.term} className="card flex flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{d.term}</h3>
                  <button
                    disabled={saved}
                    onClick={() => addCard({ areaId: topic.areaId, subareaId: topic.subareaId, topicId: topic.id, front, back: d.text + (d.source ? ` (${d.source})` : "") })}
                    className={cn("shrink-0 rounded-md px-1.5 py-1 text-[11px] font-medium", saved ? "text-emerald-600 dark:text-emerald-400" : "text-ink-500 hover:bg-ink-100 hover:text-brand-600 dark:hover:bg-ink-800")}
                    title="Als Karteikarte speichern"
                  >
                    {saved ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3" /> Karte
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Plus className="h-3 w-3" /> Karte
                      </span>
                    )}
                  </button>
                </div>
                <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{d.text}</p>
                {d.source && <p className="mt-auto pt-2 text-xs text-ink-400">{d.source}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {topic.disputes.length > 0 && (
        <section>
          <SectionTitle icon={<MessageSquareQuote className="h-4 w-4" />} count={topic.disputes.length}>
            Streitstände
          </SectionTitle>
          <div className="space-y-4">
            {topic.disputes.map((d) => (
              <div key={d.title} className="card overflow-hidden">
                <div className="border-b border-ink-100 px-5 py-3.5 dark:border-ink-800">
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-500">{d.problem}</p>
                </div>
                <div className={cn("grid divide-y divide-ink-100 dark:divide-ink-800", d.views.length === 2 && "md:grid-cols-2", d.views.length >= 3 && "md:grid-cols-3", d.views.length > 1 && "md:divide-x md:divide-y-0")}>
                  {d.views.map((v) => (
                    <div key={v.name} className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">{v.name}</p>
                      <p className="mt-1.5 text-sm text-ink-700 dark:text-ink-200">{v.content}</p>
                      {v.argument && <p className="mt-2 text-xs text-ink-500">Arg.: {v.argument}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-t border-ink-100 bg-emerald-50/60 px-5 py-3 text-sm dark:border-ink-800 dark:bg-emerald-500/5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <p>
                    <span className="font-semibold">Stellungnahme: </span>
                    {d.decision}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {topic.structures.length > 0 && (
        <section>
          <SectionTitle icon={<ListTree className="h-4 w-4" />}>Kernstrukturen</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {topic.structures.map((st) => (
              <div key={st.title} className="card p-4">
                <h3 className="font-semibold">{st.title}</h3>
                <ul className="mt-2 space-y-1.5">
                  {st.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-ink-700 dark:text-ink-200">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CaseList({ topic }: { topic: Topic }) {
  return (
    <div className="space-y-3">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <p className="text-sm text-ink-600 dark:text-ink-300">
          {topic.quiz.length} Aufgaben – davon {topic.quiz.filter((q) => q.type === "case").length} Fall-Snippets mit Korrektur-Training.
        </p>
        <Link href={`/lernpfade/${topic.id}`} className="btn-primary">
          <Play className="h-4 w-4" /> Jetzt trainieren
        </Link>
      </div>
      {topic.quiz.map((q, i) => (
        <div key={q.id} className="card p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
            <span>Aufgabe {i + 1}</span>·<span>{q.type === "case" ? "Fall-Snippet" : q.type === "multi" ? "Mehrfachauswahl" : "Einfachauswahl"}</span>
          </div>
          {q.snippet && <p className="mt-2 rounded-lg bg-ink-50 p-3 font-serif text-[15px] italic text-ink-700 dark:bg-ink-800/60 dark:text-ink-200">{q.snippet}</p>}
          <p className="mt-2 text-sm font-medium">{q.question}</p>
          {q.type === "case" && q.traps.length > 0 && (
            <p className="mt-2 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-3 w-3" /> {q.traps.length} Klausurfallen hinterlegt
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function TopicCards({ topic }: { topic: Topic }) {
  const { cards, progress } = useStudy();
  const list = cards.filter((c) => c.topicId === topic.id);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const statusLabel = { new: "Neu", learning: "In Lernphase", mastered: "Gefestigt" } as const;
  const statusClass = {
    new: "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
    learning: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
    mastered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  } as const;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500">Klicke eine Karte, um die Rückseite zu sehen.</p>
        <div className="flex gap-2">
          <button className="btn-ghost text-xs" onClick={() => setFlipped(new Set())}>
            <RotateCcw className="h-3.5 w-3.5" /> Alle umdrehen
          </button>
          <Link href={`/karteikarten/lernen?thema=${topic.id}`} className="btn-primary">
            <Layers className="h-4 w-4" /> Session starten
          </Link>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((c) => {
          const st = cardStatus(progress[c.id]);
          const isFlipped = flipped.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => setFlipped((f) => { const n = new Set(f); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; })}
              className="card min-h-[120px] p-4 text-left transition hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="label">{isFlipped ? "Rückseite" : "Vorderseite"}</span>
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", statusClass[st])}>{statusLabel[st]}</span>
              </div>
              <p className={cn("mt-2 text-sm", isFlipped ? "font-serif text-[15px] text-ink-700 dark:text-ink-200" : "font-semibold")}>{isFlipped ? c.back : c.front}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
