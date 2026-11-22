'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';

// Swaps /en/... <-> /fil/... on the same page.
export function LangSwitch({ label, ariaLabel }: { label: string; ariaLabel: string }) {
  const pathname = usePathname() ?? '/en';
  const parts = pathname.split('/');
  parts[1] = parts[1] === 'fil' ? 'en' : 'fil';
  const target = parts.join('/') || '/';

  return (
    <Link
      href={target}
      aria-label={ariaLabel}
      hrefLang={parts[1]}
      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <Languages className="size-4" aria-hidden />
      {label}
    </Link>
  );
}
