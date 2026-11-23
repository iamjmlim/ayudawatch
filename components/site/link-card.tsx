import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

// A whole-row link that looks tappable: bordered card, green title, arrow on the right.
export function LinkCard({ href, title, description, icon }: { href: string; title: string; description?: string; icon?: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex min-h-16 items-center gap-4 rounded-lg border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary hover:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:px-5"
    >
      {icon && <span className="shrink-0 text-primary">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-lg leading-snug font-semibold text-primary underline decoration-primary/0 underline-offset-4 transition-colors group-hover:decoration-primary sm:text-xl">
          {title}
        </span>
        {description && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>}
      </span>
      <ChevronRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
