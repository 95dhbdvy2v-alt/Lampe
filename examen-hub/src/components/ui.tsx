import type { AreaId } from "@/lib/types";
import { areaStyle, cn } from "@/lib/ui";
import { areaById } from "@/lib/data";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 pb-5 pt-6 sm:px-8 sm:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && <div className="mb-2 text-xs font-medium text-ink-500 dark:text-ink-400">{eyebrow}</div>}
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl dark:text-white">{title}</h1>
            {description && <p className="mt-1.5 max-w-2xl text-sm text-ink-500 dark:text-ink-400">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </header>
  );
}

export function AreaPill({ areaId, className }: { areaId: AreaId; className?: string }) {
  const s = areaStyle[areaId];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1", s.soft, s.text, s.ring, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {areaById(areaId)?.name}
    </span>
  );
}

export function Difficulty({ level }: { level: 1 | 2 | 3 }) {
  const label = ["Grundlagen", "Fortgeschritten", "Examensniveau"][level - 1];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-ink-400" title={label}>
      <span className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className={cn("h-2.5 w-1 rounded-sm", i <= level ? "bg-ink-600 dark:bg-ink-300" : "bg-ink-200 dark:bg-ink-700")} />
        ))}
      </span>
      {label}
    </span>
  );
}

export function ProgressBar({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800", className)}>
      <div className={cn("h-full rounded-full transition-all", barClass ?? "bg-brand-500")} style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }} />
    </div>
  );
}

export function EmptyState({ icon, title, text, action }: { icon: React.ReactNode; title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">{icon}</div>
      <p className="font-semibold">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-ink-500">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
