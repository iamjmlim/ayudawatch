import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { rankStories, StoryList, StoryListSkeleton } from '@/components/site/story-list';
import { DigestSignup } from '@/components/site/digest-signup';
import { formatDate, formatTime, getDictionary, isLocale } from '@/lib/i18n';
import { getLatestStories } from '@/lib/news';
import { website } from '@/lib/structured-data';
import { JsonLd } from '@/components/site/json-ld';

async function HomeStories({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const stories = await getLatestStories(lang);
  const lastChange = stories
    .flatMap((s) => [s.publishedAt, s.summaryUpdatedAt ?? s.publishedAt])
    .sort()
    .at(-1);

  return (
    <>
      <JsonLd data={website(lang, t.description)} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-b border-border pt-5 pb-3 sm:pt-7 sm:pb-4">
        <h1 className="font-serif text-xl font-semibold tracking-tight sm:text-3xl">{t.topStories}</h1>
        {lastChange && (
          <p className="text-[0.8125rem] text-muted-foreground sm:text-sm">
            <span className="capitalize">{formatDate(lastChange, lang)}</span>
            <span aria-hidden> · </span>
            {t.lastUpdated} <time dateTime={lastChange}>{formatTime(lastChange, lang)}</time>
            <span className="hidden sm:inline">
              <span aria-hidden> · </span>
              <Link href={`/${lang}/about`} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                {t.about}
              </Link>
            </span>
          </p>
        )}
      </div>
      <StoryList stories={rankStories(stories)} locale={lang} />
      <DigestSignup locale={lang} />
    </>
  );
}

export default function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<StoryListSkeleton />}>
      <HomeStories params={params} />
    </Suspense>
  );
}
