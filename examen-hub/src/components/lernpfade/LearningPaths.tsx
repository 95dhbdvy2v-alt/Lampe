"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Flag, Gavel, ListChecks, Play, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { areas, orderedTopics, subareasOf, topicsOfSubarea } from "@/lib/data";
import type { AreaId, Topic } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { type QuizResult, useStudy } from "@/lib/store";
import { Difficulty, PageHeader, ProgressBar } from "@/components/ui";

const PASS = 0.8;

export function LearningPaths() {
  const params = useSearchParams();
  const router = useRouter();
  const area = (areas.find((a) => a.id === params.get("gebiet"))?.id ?? "zivilrecht") as AreaId;
  const { quiz, ready } = useStudy();

  const ordered = orderedTopics(area);
  const next = ordered.find((t) => !quiz[t.id] || quiz[t.id].best < PASS);
  const s = areaStyle[area];

  return (
    <div>
      <PageHeader
        eyebrow="Interaktives Training"
        title="Lernpfade"
        description="Arbeite dich Schritt für Schritt durch die Rechtsgebiete: Quizfragen, Fall-Snippets und strukturierter Abgleich mit der Musterlösung."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {areas.map((a) => {
            const list = orderedTopics(a.id);
            const passed = list.filter((t) => (quiz[t.id]?.best ?? 0) >= PASS).length;
            const started = list.filter((t) => quiz[t.id]).length;
            const st = areaStyle[a.id];
            const active = a.id === area;
            return (
              <button
                key={a.id}
                onClick={() => router.replace(`/lernpfade?gebiet=${a.id}`, { scroll: false })}
                className={cn("rounded-xl border p-4 text-left transition", active ? cn("bg-white shadow-lift dark:bg-ink-900", st.border, "border-2") : "border-ink-200 bg-white hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:hover:bg-ink-800")}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span className={cn("h-2.5 w-2.5 rounded-full", st.dot)} />
                    {a.name}
                  </span>
                  <span className="text-xs tabular-nums text-ink-400">{ready ? `${passed}/${list.length}` : "–"}</span>
                </div>
                <ProgressBar value={ready ? passed / list.length : 0} barClass={st.bar} className="mt-3" />
                <p className="mt-2 text-[11px] text-ink-400">
                  {started} begonnen · {passed} abgeschlossen (≥ {PASS * 100} %)
                </p>
              </button>
            );
          })}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        {next ? (
          <div className={cn("card mb-8 flex flex-wrap items-center justify-between gap-4 overflow-hidden bg-gradient-to-r p-5", s.gradient)}>
            <div className="flex items-center gap-3">
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", s.bar)}>
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="label">Empfohlener nächster Schritt</p>
                <p className="font-serif text-lg font-semibold">{next.title}</p>
              </div>
            </div>
            <Link href={`/lernpfade/${next.id}`} className="btn-primary">
              <Play className="h-4 w-4" /> {quiz[next.id] ? "Fortsetzen" : "Starten"}
            </Link>
          </div>
        ) : (
          <div className="card mb-8 flex items-center gap-3 p-5">
            <Trophy className="h-6 w-6 text-amber-500" />
            <p className="text-sm">
              Stark! Du hast alle Module in <strong>{areas.find((a) => a.id === area)?.name}</strong> mit mindestens {PASS * 100} % abgeschlossen.
            </p>
          </div>
        )}

        <ol className="space-y-10">
          {subareasOf(area).map((sub, si) => {
            const items = topicsOfSubarea(sub.id);
            const done = items.filter((t) => (quiz[t.id]?.best ?? 0) >= PASS).length;
            return (
              <li key={sub.id}>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="label">Etappe {si + 1}</p>
                    <h2 className="font-serif text-xl font-semibold">{sub.name}</h2>
                    <p className="text-sm text-ink-500">{sub.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-ink-500">
                    <Flag className="h-3.5 w-3.5" /> {done}/{items.length}
                  </span>
                </div>
                <ol className="relative ml-5 border-l-2 border-dashed border-ink-200 dark:border-ink-700">
                  {items.map((t) => (
                    <PathNode key={t.id} topic={t} result={quiz[t.id]} recommended={next?.id === t.id} />
                  ))}
                </ol>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function PathNode({ topic, result, recommended }: { topic: Topic; result?: QuizResult; recommended: boolean }) {
  const s = areaStyle[topic.areaId];
  const passed = (result?.best ?? 0) >= PASS;
  const cases = topic.quiz.filter((q) => q.type === "case").length;

  return (
    <li className="relative pb-4 pl-8 last:pb-0">
      <span
        className={cn(
          "absolute -left-[17px] top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-xs font-bold dark:bg-ink-900",
          passed ? cn(s.bar, "border-transparent text-white") : result ? cn(s.border, s.text) : recommended ? cn(s.border, s.text, "ring-4 ring-offset-0", s.ring) : "border-ink-300 text-ink-400 dark:border-ink-600",
        )}
      >
        {passed ? <Check className="h-4 w-4" /> : result ? `${Math.round(result.best * 100)}` : <Play className="h-3 w-3" />}
      </span>
      <div className={cn("card flex flex-wrap items-center justify-between gap-3 p-4", recommended && "ring-2 ring-brand-200 dark:ring-brand-500/30")}>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{topic.title}</h3>
            {recommended && <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">Empfohlen</span>}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-500">
            <span className="flex items-center gap-1">
              <ListChecks className="h-3.5 w-3.5" /> {topic.quiz.length - cases} Quizfragen
            </span>
            {cases > 0 && (
              <span className="flex items-center gap-1">
                <Gavel className="h-3.5 w-3.5" /> {cases} Fall-Snippets
              </span>
            )}
            <Difficulty level={topic.difficulty} />
          </div>
          {result && (
            <div className="mt-2 flex items-center gap-2">
              <ProgressBar value={result.best} barClass={passed ? "bg-emerald-500" : "bg-amber-500"} className="w-32" />
              <span className="text-[11px] text-ink-500">
                Bestwert {Math.round(result.best * 100)} % · {result.attempts}× versucht
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/datenbank/${topic.id}`} className="btn-ghost text-xs">
            Schema ansehen
          </Link>
          <Link href={`/lernpfade/${topic.id}`} className={result ? "btn-secondary" : "btn-primary"}>
            {result ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {result ? "Wiederholen" : "Starten"}
          </Link>
        </div>
      </div>
    </li>
  );
}
