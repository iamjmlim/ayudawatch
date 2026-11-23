'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Item = { href: string; label: string };

// Section tabs. Marks the current section, and fades the right edge so phone
// readers can tell the row scrolls.
export function SectionNav({ items, label }: { items: Item[]; label: string }) {
  const pathname = usePathname() ?? '';
  // A story page belongs to no tab; only exact section paths are "current".
  const current =
    items.find((i) => pathname === i.href || pathname === `${i.href}/`)?.href ??
    // Inside a section (e.g. /en/guides/some-guide): highlight that section, never the home tab.
    items.find((i) => i.href.split('/').length > 2 && pathname.startsWith(`${i.href}/`))?.href;
  const activeRef = useRef<HTMLAnchorElement>(null);

  // On phones the row scrolls: bring the current section into view.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [current]);

  return (
    <nav aria-label={label} className="relative mx-auto max-w-5xl">
      <ul className="-mb-px flex gap-5 overflow-x-auto px-4 pb-px text-sm [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] [scrollbar-width:none] sm:px-6 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                ref={active ? activeRef : undefined}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center border-b-2 whitespace-nowrap transition-colors',
                  active
                    ? 'border-highlight font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-highlight/60 hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li aria-hidden className="w-6 shrink-0 sm:hidden" />
      </ul>
    </nav>
  );
}
