import type { AreaId } from "./types";

export const areaStyle: Record<
  AreaId,
  { dot: string; text: string; soft: string; ring: string; bar: string; barSoft: string; gradient: string; border: string }
> = {
  zivilrecht: {
    dot: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-300",
    soft: "bg-sky-50 dark:bg-sky-500/10",
    ring: "ring-sky-200 dark:ring-sky-500/30",
    bar: "bg-sky-500",
    barSoft: "bg-sky-200 dark:bg-sky-500/30",
    gradient: "from-sky-500/15 via-sky-500/5 to-transparent",
    border: "border-sky-500",
  },
  strafrecht: {
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-300",
    soft: "bg-rose-50 dark:bg-rose-500/10",
    ring: "ring-rose-200 dark:ring-rose-500/30",
    bar: "bg-rose-500",
    barSoft: "bg-rose-200 dark:bg-rose-500/30",
    gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
    border: "border-rose-500",
  },
  "oeffentliches-recht": {
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-50 dark:bg-emerald-500/10",
    ring: "ring-emerald-200 dark:ring-emerald-500/30",
    bar: "bg-emerald-500",
    barSoft: "bg-emerald-200 dark:bg-emerald-500/30",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    border: "border-emerald-500",
  },
};

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
