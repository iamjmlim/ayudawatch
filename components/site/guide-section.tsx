import type { GuideSection as Section } from '@/lib/guides';

// One section of a guide or of a calculator's explainer: heading, then text, bullets, numbered steps and a note.
export function GuideSection({ s }: { s: Section }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{s.heading}</h2>
      {s.text && <p className="mt-3 leading-relaxed">{s.text}</p>}
      {s.points && (
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-primary">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {s.steps && (
        <ol className="mt-4 space-y-4">
          {s.steps.map((p, i) => (
            <li key={p} className="grid grid-cols-[2rem_1fr] gap-x-2 leading-relaxed">
              <span className="font-serif text-xl leading-tight font-semibold text-primary">{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      )}
      {s.note && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.note}</p>}
    </section>
  );
}

/** Common questions as an accessible, collapsible list. */
export function Faqs({ heading, items }: { heading: string; items: { q: string; a: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-4 divide-y divide-border rounded-lg border border-border">
        {items.map((f) => (
          <details key={f.q} className="group px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              <h3 className="text-base">{f.q}</h3>
              <span aria-hidden className="text-xl leading-none text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
