import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary, type CategorySlug, type Locale } from '@/lib/i18n';
import type { Story } from '@/lib/news';
import { StoryCard } from './story-card';

// "Top stories" order: corroboration first, freshness second. Each extra outlet
// counts fully; a story loses half its weight for every 12 hours it is older than
// the newest story on the page (relative, so it needs no clock and stays cacheable).
export function rankStories(stories: Story[]): Story[] {
  if (stories.length === 0) return stories;
  const newest = Math.max(...stories.map((s) => Date.parse(s.publishedAt)));
  const score = (s: Story) => s.sources.length * Math.pow(0.5, (newest - Date.parse(s.publishedAt)) / 43_200_000);
  return [...stories].sort((a, b) => score(b) - score(a));
}

export function StoryList({
  stories,
  locale,
  lead = true,
  category,
}: {
  stories: Story[];
  locale: Locale;
  lead?: boolean;
  category?: CategorySlug;
}) {
  const t = getDictionary(locale);
  if (stories.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mx-auto max-w-[32rem] text-pretty text-muted-foreground">{t.noStories}</p>
        <p className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/85"
          >
            {t.noStoriesCta} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    );
  }
  const [first, ...rest] = stories;
  const list = lead ? rest : stories;

  return (
    <div>
      {lead && (
        <div className="border-b border-border">
          <StoryCard story={first} locale={locale} variant="lead" />
        </div>
      )}
      <div className="divide-y divide-border">
        {list.map((s, i) => {
          // Repeat the section label only when it changes from the story above.
          const prev = i === 0 ? (lead ? first : undefined) : list[i - 1];
          return (
            <StoryCard
              key={s.id}
              story={s}
              locale={locale}
              showCategory={!category && s.category !== prev?.category}
            />
          );
        })}
      </div>
    </div>
  );
}

export function StoryListSkeleton() {
  return (
    <div className="animate-pulse space-y-10 py-10" aria-hidden>
      <div className="space-y-3">
        <div className="h-9 w-4/5 rounded bg-muted" />
        <div className="h-4 w-3/5 rounded bg-muted" />
        <div className="h-5 w-40 rounded-full bg-muted" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-4 w-32 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}
