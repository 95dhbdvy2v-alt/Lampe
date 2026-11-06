"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, FileText } from "lucide-react";
import { areas, subareasOf, topicsOfSubarea } from "@/lib/data";
import { areaStyle, cn } from "@/lib/ui";

/** Hierarchische Navigation: Rechtsgebiet → Untergebiet → Thema */
export function LibraryTree() {
  const pathname = usePathname();
  const activeTopic = pathname.split("/")[2];
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-ink-200 bg-white/60 px-3 py-6 scrollbar-thin xl:block dark:border-ink-800 dark:bg-ink-900/40">
      <Link href="/datenbank" className={cn("mb-4 block rounded-md px-2 py-1.5 text-sm font-semibold", !activeTopic ? "text-brand-700 dark:text-brand-300" : "text-ink-700 hover:text-ink-900 dark:text-ink-200")}>
        Alle Themen
      </Link>
      {areas.map((area) => (
        <div key={area.id} className="mb-4">
          <p className="mb-1 flex items-center gap-2 px-2">
            <span className={cn("h-2 w-2 rounded-full", areaStyle[area.id].dot)} />
            <span className="label text-ink-500 dark:text-ink-400">{area.name}</span>
          </p>
          {subareasOf(area.id).map((sub) => {
            const items = topicsOfSubarea(sub.id);
            const containsActive = items.some((t) => t.id === activeTopic);
            const isCollapsed = collapsed[sub.id] ?? !containsActive;
            return (
              <div key={sub.id}>
                <button
                  onClick={() => setCollapsed((c) => ({ ...c, [sub.id]: !isCollapsed }))}
                  className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform", !isCollapsed && "rotate-90")} />
                  <span className="flex-1 truncate">{sub.name}</span>
                  <span className="text-[10px] tabular-nums text-ink-400">{items.length}</span>
                </button>
                {!isCollapsed && (
                  <ul className="mb-1 ml-[18px] border-l border-ink-200 pl-2 dark:border-ink-700">
                    {items.map((t) => (
                      <li key={t.id}>
                        <Link
                          href={`/datenbank/${t.id}`}
                          className={cn(
                            "flex items-start gap-1.5 rounded-md px-2 py-1 text-[13px] leading-snug",
                            t.id === activeTopic
                              ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"
                              : "text-ink-500 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100",
                          )}
                        >
                          <FileText className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                          {t.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
