'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calculator } from 'lucide-react';

export type CheckerItem = { key: string; label: string; links: { href: string; title: string; kind: 'guide' | 'calculator' }[] };

// Tick situations, see the guides and calculators for them. Runs only in the browser; nothing is sent anywhere.
export function BenefitChecker({ items, resultsTitle, noneText }: { items: CheckerItem[]; resultsTitle: string; noneText: string }) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (key: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const links = items.filter((i) => picked.has(i.key)).flatMap((i) => i.links);
  const unique = [...new Map(links.map((l) => [l.href, l])).values()];

  return (
    <div className="grid gap-8">
      <fieldset className="grid gap-2">
        {items.map((item) => (
          <label
            key={item.key}
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-paper"
          >
            <input type="checkbox" className="size-5 shrink-0 accent-[var(--primary)]" checked={picked.has(item.key)} onChange={() => toggle(item.key)} />
            <span className="leading-snug">{item.label}</span>
          </label>
        ))}
      </fieldset>

      <section aria-live="polite">
        <h2 className="font-serif text-2xl font-semibold">{resultsTitle}</h2>
        {unique.length === 0 ? (
          <p className="mt-2 text-muted-foreground">{noneText}</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {unique.map((l) => (
              <li key={l.href} className="py-3">
                <Link href={l.href} className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline">
                  {l.kind === 'calculator' ? <Calculator className="size-4 shrink-0" aria-hidden /> : <BookOpen className="size-4 shrink-0" aria-hidden />}
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
