import Link from 'next/link';
import { BookOpen, CalendarDays, Table2 } from 'lucide-react';
import { guidesFor } from '@/lib/guides';
import { TABLES } from '@/lib/tables';
import { getDictionary, type CategorySlug, type Locale } from '@/lib/i18n';

// Evergreen guides and contribution tables for a section, shown above its latest stories.
export function GuideLinks({ category, locale }: { category: CategorySlug; locale: Locale }) {
  const guides = guidesFor(category);
  const tables = TABLES.filter((t) => t.category === category);
  if (!guides.length && !tables.length && category !== 'holiday') return null;
  const t = getDictionary(locale);
  const linkClass = 'inline-flex min-h-11 items-center gap-2 font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary sm:min-h-0';
  return (
    <aside aria-labelledby="guides-title" className="mt-4 rounded-lg border border-border px-5 py-4">
      <h2 id="guides-title" className="flex items-center gap-2 text-sm font-semibold">
        <BookOpen className="size-4 text-primary" aria-hidden />
        {t.guidesIn(t.categories[category])}
      </h2>
      <ul className="mt-2 space-y-1">
        {category === 'holiday' &&
          ['2027', '2026'].map((y) => (
            <li key={y}>
              <Link href={`/${locale}/holidays/${y}`} className={linkClass}>
                <CalendarDays className="size-4 shrink-0" aria-hidden />
                {locale === 'fil' ? `Mga holiday sa Pilipinas ${y}` : `Philippine holidays ${y}`}
              </Link>
            </li>
          ))}
        {tables.map((tb) => (
          <li key={tb.slug}>
            <Link href={`/${locale}/tables/${tb.slug}`} className={linkClass}>
              <Table2 className="size-4 shrink-0" aria-hidden />
              {tb[locale].title}
            </Link>
          </li>
        ))}
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/${locale}/guides/${g.slug}`} className={linkClass}>
              {g[locale].title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
