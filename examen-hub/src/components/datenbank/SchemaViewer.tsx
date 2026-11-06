"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronsDownUp, ChevronsUpDown, Eye, EyeOff, Lightbulb } from "lucide-react";
import type { Schema, SchemaStep } from "@/lib/types";
import { cn } from "@/lib/ui";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Klassische juristische Gliederung: A. → I. → 1. → a) → aa) */
function marker(level: number, i: number) {
  switch (level) {
    case 0:
      return `${String.fromCharCode(65 + i)}.`;
    case 1:
      return `${ROMAN[i] ?? i + 1}.`;
    case 2:
      return `${i + 1}.`;
    case 3:
      return `${String.fromCharCode(97 + i)})`;
    default:
      return `${String.fromCharCode(97 + i).repeat(2)})`;
  }
}

function collectPaths(steps: SchemaStep[], prefix = ""): string[] {
  return steps.flatMap((s, i) => {
    const p = `${prefix}${i}`;
    return [p, ...(s.children ? collectPaths(s.children, `${p}.`) : [])];
  });
}

export function SchemaViewer({ schema }: { schema: Schema }) {
  const allPaths = useMemo(() => collectPaths(schema.steps), [schema]);
  const [open, setOpen] = useState<Set<string>>(() => new Set(schema.steps.map((_, i) => `${i}`)));
  const [learn, setLearn] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggle = (p: string) =>
    setOpen((o) => {
      const n = new Set(o);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });
  const reveal = (p: string) => setRevealed((r) => new Set(r).add(p));
  const allOpen = open.size >= allPaths.length;

  const problemCount = useMemo(() => {
    const count = (steps: SchemaStep[]): number => steps.reduce((n, s) => n + (s.problems?.length ?? 0) + (s.children ? count(s.children) : 0), 0);
    return count(schema.steps);
  }, [schema]);

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 bg-ink-50/60 px-5 py-4 dark:border-ink-800 dark:bg-ink-800/30">
        <div>
          <h3 className="font-serif text-lg font-semibold">{schema.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <span className="chip">{schema.norm}</span>
            {problemCount > 0 && (
              <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
                <AlertTriangle className="h-3 w-3" /> {problemCount} Problemstände
              </span>
            )}
          </div>
          {schema.intro && <p className="mt-2 text-sm text-ink-500">{schema.intro}</p>}
        </div>
        <div className="flex gap-1.5">
          <button
            className={cn("btn-secondary px-2.5 py-1.5 text-xs", learn && "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200")}
            onClick={() => {
              setLearn((l) => !l);
              setRevealed(new Set());
            }}
            title="Hinweise und Probleme abdecken, um das Schema aktiv abzurufen"
          >
            {learn ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            Lernmodus
          </button>
          <button className="btn-secondary px-2.5 py-1.5 text-xs" onClick={() => setOpen(allOpen ? new Set() : new Set(allPaths))}>
            {allOpen ? <ChevronsDownUp className="h-3.5 w-3.5" /> : <ChevronsUpDown className="h-3.5 w-3.5" />}
            {allOpen ? "Zuklappen" : "Aufklappen"}
          </button>
        </div>
      </div>
      <ol className="p-3 sm:p-4">
        {schema.steps.map((s, i) => (
          <StepNode key={i} step={s} level={0} index={i} path={`${i}`} open={open} toggle={toggle} learn={learn} revealed={revealed} reveal={reveal} />
        ))}
      </ol>
    </div>
  );
}

function StepNode({
  step,
  level,
  index,
  path,
  open,
  toggle,
  learn,
  revealed,
  reveal,
}: {
  step: SchemaStep;
  level: number;
  index: number;
  path: string;
  open: Set<string>;
  toggle: (p: string) => void;
  learn: boolean;
  revealed: Set<string>;
  reveal: (p: string) => void;
}) {
  const hasDetails = !!(step.hint || step.problems?.length || step.children?.length);
  const isOpen = open.has(path);
  const hidden = learn && !revealed.has(path);
  const hasInfo = !!(step.hint || step.problems?.length || step.norm);

  return (
    <li className={cn(level > 0 && "ml-4 border-l border-ink-200 pl-3 sm:ml-6 dark:border-ink-700")}>
      <button
        onClick={() => hasDetails && toggle(path)}
        className={cn(
          "group flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-left transition",
          hasDetails && "hover:bg-ink-50 dark:hover:bg-ink-800/60",
          level === 0 && "py-2",
        )}
      >
        <span
          className={cn(
            "mt-px shrink-0 font-mono text-xs font-semibold tabular-nums",
            level === 0 ? "flex h-6 w-6 items-center justify-center rounded-md bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "min-w-[1.5rem] text-ink-400",
          )}
        >
          {marker(level, index)}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn("font-medium", level === 0 ? "text-[15px] font-semibold" : "text-sm")}>{step.title}</span>
          {step.norm && !hidden && <span className="chip ml-2 align-middle">{step.norm}</span>}
          {!isOpen && step.problems && step.problems.length > 0 && !hidden && (
            <span className="ml-2 inline-flex items-center gap-0.5 align-middle text-[11px] text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              {step.problems.length}
            </span>
          )}
        </span>
        {hasDetails && <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-ink-300 transition-transform", isOpen && "rotate-180")} />}
      </button>

      {isOpen && (
        <div className="pb-1">
          {hasInfo && hidden ? (
            <button onClick={() => reveal(path)} className="mb-1 ml-10 inline-flex items-center gap-1 rounded-md border border-dashed border-ink-300 px-2 py-1 text-xs text-ink-500 hover:border-brand-400 hover:text-brand-600 dark:border-ink-600">
              <Eye className="h-3 w-3" /> Hinweise aufdecken
            </button>
          ) : (
            <>
              {step.hint && (
                <p className="mb-1.5 ml-10 flex gap-1.5 text-sm text-ink-600 dark:text-ink-300">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                  <span>{step.hint}</span>
                </p>
              )}
              {step.problems && step.problems.length > 0 && (
                <ul className="mb-2 ml-10 space-y-1">
                  {step.problems.map((p) => (
                    <li key={p} className="flex gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[13px] text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span>
                        <span className="font-semibold">Problem: </span>
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {step.children && (
            <ol>
              {step.children.map((c, i) => (
                <StepNode key={i} step={c} level={level + 1} index={i} path={`${path}.${i}`} open={open} toggle={toggle} learn={learn} revealed={revealed} reveal={reveal} />
              ))}
            </ol>
          )}
        </div>
      )}
    </li>
  );
}
