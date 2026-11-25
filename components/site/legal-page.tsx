import type { ReactNode } from 'react';
import type { LegalPage as Page } from '@/lib/legal-pages';

// Shared layout for the Privacy Policy and Contact pages.
export function LegalPage({ page, meta, children }: { page: Page; meta?: ReactNode; children?: ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance">{page.title}</h1>
      {meta && <p className="mt-2 text-sm text-muted-foreground">{meta}</p>}
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{page.intro}</p>
      {children}
      {page.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">{s.heading}</h2>
          {s.text && <p className="mt-3 leading-relaxed">{s.text}</p>}
          {s.points && (
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-primary">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
