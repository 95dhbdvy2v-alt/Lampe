"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Layers, Library, Menu, Moon, Route, Scale, Sun, X } from "lucide-react";
import { areas, topics } from "@/lib/data";
import { summarize, useStudy } from "@/lib/store";
import { areaStyle, cn } from "@/lib/ui";

const nav = [
  { href: "/datenbank", label: "Datenbank", sub: "Schemata & Themen", icon: Library },
  { href: "/lernpfade", label: "Lernpfade", sub: "Quiz & Korrektur", icon: Route },
  { href: "/karteikarten", label: "Karteikarten", sub: "Spaced Repetition", icon: Layers },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { ready, cards, progress, quiz } = useStudy();
  const stats = summarize(cards, progress);
  const doneModules = Object.keys(quiz).length;

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Mobile Top-Bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink-200 bg-white/90 px-4 backdrop-blur lg:hidden dark:border-ink-800 dark:bg-ink-900/90">
        <Brand />
        <button className="btn-ghost p-2" onClick={() => setOpen(true)} aria-label="Navigation öffnen">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-200 bg-white transition-transform dark:border-ink-800 dark:bg-ink-900",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Brand />
          <button className="btn-ghost p-1.5 lg:hidden" onClick={() => setOpen(false)} aria-label="Navigation schließen">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1 px-3 pt-2">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            const badge =
              item.href === "/karteikarten" && ready && stats.due > 0
                ? stats.due
                : item.href === "/lernpfade" && ready
                  ? `${doneModules}/${topics.length}`
                  : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition",
                  active
                    ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-500/20"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                    active ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-ink-950" : "bg-ink-100 text-ink-500 group-hover:text-ink-700 dark:bg-ink-800 dark:text-ink-400",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                  <span className="block truncate text-xs text-ink-400">{item.sub}</span>
                </span>
                {badge !== null && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                      item.href === "/karteikarten" ? "bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-200" : "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400",
                    )}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 px-5">
          <p className="label mb-2">Rechtsgebiete</p>
          <ul className="space-y-0.5">
            {areas.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/datenbank?gebiet=${a.id}`}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
                >
                  <span className={cn("h-2 w-2 rounded-full", areaStyle[a.id].dot)} />
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto space-y-3 border-t border-ink-100 p-4 dark:border-ink-800">
          <div className="rounded-lg bg-ink-50 p-3 dark:bg-ink-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink-600 dark:text-ink-300">Karteikarten gefestigt</span>
              <span className="tabular-nums text-ink-500">{ready ? `${stats.mastered}/${stats.total}` : "–"}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-700">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: ready && stats.total ? `${(stats.mastered / stats.total) * 100}%` : "0%" }}
              />
            </div>
          </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

function Brand() {
  return (
    <Link href="/datenbank" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-white dark:bg-white dark:text-ink-900">
        <Scale className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-[15px] font-semibold tracking-tight">ExamenHub</span>
        <span className="block text-[10px] font-medium uppercase tracking-widest text-ink-400">Erstes Staatsexamen</span>
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("examen-hub:theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button onClick={toggle} className="btn-secondary w-full justify-between">
      <span className="flex items-center gap-2">
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        {dark ? "Dunkler Modus" : "Heller Modus"}
      </span>
      <span className={cn("relative h-4 w-7 rounded-full transition", dark ? "bg-brand-500" : "bg-ink-300")}>
        <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-all", dark ? "left-3.5" : "left-0.5")} />
      </span>
    </button>
  );
}
