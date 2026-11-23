import { ExternalLink, Landmark } from 'lucide-react';
import { OFFICIAL_LINKS } from '@/lib/agencies';
import { getDictionary, type CategorySlug, type Locale } from '@/lib/i18n';

// The official websites for a section: where readers confirm anything they read here.
export function OfficialLinks({ category, locale }: { category: CategorySlug; locale: Locale }) {
  const t = getDictionary(locale);
  const links = OFFICIAL_LINKS[category];
  if (!links?.length) return null;
  return (
    <aside aria-labelledby="official-title" className="mt-6 rounded-lg border border-border bg-paper px-5 py-4">
      <h2 id="official-title" className="flex items-center gap-2 text-sm font-semibold">
        <Landmark className="size-4 text-primary" aria-hidden />
        {t.officialSources}
      </h2>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {links.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1 font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary sm:min-h-0"
            >
              {l.name}
              <ExternalLink className="size-3.5" aria-hidden />
              <span className="sr-only"> {t.opensNewTab}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">{t.notGov}</p>
    </aside>
  );
}
