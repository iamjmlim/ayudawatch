import type { ReactNode } from 'react';

// Small shared pieces for the calculators.

export const peso = (n: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(n);

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>}
    </div>
  );
}

export const inputClass =
  'h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 text-base tabular-nums outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30';

export function Result({ label, value, sub }: { label: string; value: string; sub?: ReactNode }) {
  return (
    <div className="rounded-lg border border-primary/40 bg-paper px-5 py-4" aria-live="polite">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-3xl font-semibold tabular-nums text-primary">{value}</p>
      {sub && <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{sub}</div>}
    </div>
  );
}

/** Parses a typed amount like "18,500" or "18500.50"; empty or invalid gives NaN. */
export function toNumber(s: string): number {
  const n = Number(s.replace(/[,\s₱]/g, ''));
  return s.trim() === '' ? NaN : n;
}
