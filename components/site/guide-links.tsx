import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { guidesFor } from '@/lib/guides';
import { getDictionary, type CategorySlug, type Locale } from '@/lib/i18n';

// Evergreen guides for a section, shown above its latest stories.
export function GuideLinks({ category, locale }: { category: CategorySlug; locale: Locale }) {
  const guides = guidesFor(category);
  if (!guides.length) return null;
  const t = getDictionary(locale);
  return (
    <aside aria-labelledby="guides-title" className="mt-4 rounded-lg border border-border px-5 py-4">
      <h2 id="guides-title" className="flex items-center gap-2 text-sm font-semibold">
        <BookOpen className="size-4 text-primary" aria-hidden />
        {t.guidesIn(t.categories[category])}
      </h2>
      <ul className="mt-2 space-y-1">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/${locale}/guides/${g.slug}`}
              className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline sm:min-h-0"
            >
              {g[locale].title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
