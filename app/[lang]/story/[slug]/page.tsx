import { Suspense } from 'react';
import type { Metadata } from 'next';
import { hreflang } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { OutletCount } from '@/components/site/outlet-count';
import { StoryCard } from '@/components/site/story-card';
import { DigestSignup } from '@/components/site/digest-signup';
import { OfficialLinks } from '@/components/site/official-links';
import { formatDateTime, getDictionary, isLocale } from '@/lib/i18n';
import { getLatestStories, getRecentSlugs, getStory } from '@/lib/news';
import { newsArticle } from '@/lib/structured-data';
import { JsonLd } from '@/components/site/json-ld';

type Params = Promise<{ lang: string; slug: string }>;

// Cache Components needs at least one value; a placeholder covers an empty database.
export async function generateStaticParams() {
  const slugs = await getRecentSlugs(30).catch(() => []);
  return (slugs.length ? slugs : ['__placeholder__']).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const story = await getStory(slug, lang);
  if (!story) return {};
  return {
    title: story.headline,
    description: story.summary.slice(0, 200),
    alternates: {
      canonical: `/${lang}/story/${slug}`,
      languages: hreflang({ en: `/en/story/${slug}`, fil: `/fil/story/${slug}` }),
    },
    openGraph: {
      type: 'article',
      title: story.headline,
      description: story.summary.slice(0, 200),
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
    },
  };
}

async function MoreStories({ lang, slug, category }: { lang: 'en' | 'fil'; slug: string; category: string | null }) {
  if (!category) return null;
  const t = getDictionary(lang);
  const cat = category as keyof typeof t.categories;
  const more = (await getLatestStories(lang, cat, 8)).filter((s) => s.slug !== slug).slice(0, 3);
  if (more.length === 0) return null;
  return (
    <section aria-labelledby="more-heading" className="mt-14 border-t-2 border-foreground/80 pt-5">
      <h2 id="more-heading" className="font-serif text-xl font-semibold">
        <Link href={`/${lang}/${category}`} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
          {t.moreIn(t.categories[cat])}
        </Link>
      </h2>
      <div className="divide-y divide-border">
        {more.map((s) => (
          <StoryCard key={s.id} story={s} locale={lang} showCategory={false} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}

async function StoryBody({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const story = await getStory(slug, lang);
  if (!story) notFound();
  const t = getDictionary(lang);
  const contact = process.env.CONTACT_EMAIL;

  return (
    <article className="mx-auto max-w-[42rem] py-8 sm:py-10">
      <JsonLd data={newsArticle(story, lang)} />
      <Link
        href={`/${lang}`}
        className="mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t.backHome}
      </Link>

      <h1 className="font-serif text-[1.85rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
        {story.headline}
      </h1>

      {/* Trust first: who reported it, when, and how this text was made. */}
      <div className="mt-5 space-y-2.5 text-sm text-muted-foreground">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <a href="#sources-heading" className="rounded-full focus-visible:ring-3 focus-visible:ring-ring/50">
            <OutletCount count={story.sources.length} locale={lang} size="md" />
          </a>
          {story.category && (
            <Link href={`/${lang}/${story.category}`} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              {t.categories[story.category]}
            </Link>
          )}
        </p>
        <p>
          {t.published} <time dateTime={story.publishedAt}>{formatDateTime(story.publishedAt, lang)}</time>
          {story.summaryUpdatedAt && (
            <>
              <span aria-hidden> · </span>
              <span className="font-medium text-foreground">{t.updated}</span>{' '}
              <time dateTime={story.summaryUpdatedAt}>{formatDateTime(story.summaryUpdatedAt, lang)}</time>
            </>
          )}
        </p>
        <p className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 shrink-0" aria-hidden />
          <a href="#ai-notice" className="underline decoration-border underline-offset-4 hover:decoration-current">
            {t.aiShort}
          </a>
        </p>
      </div>

      <p className="mt-7 text-[1.0625rem] leading-relaxed text-pretty sm:text-lg">{story.summary}</p>

      {story.whyItMatters && (
        <aside className="mt-7 rounded-lg border border-highlight/50 bg-highlight/10 px-5 py-4">
          <h2 className="font-serif text-lg font-semibold">{t.whyItMatters}</h2>
          <p className="mt-1 leading-relaxed text-pretty">{story.whyItMatters}</p>
        </aside>
      )}

      {story.category && <OfficialLinks category={story.category} locale={lang} />}

      <section className="mt-10" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="scroll-mt-6 font-serif text-xl font-semibold">
          {t.readOriginals}
        </h2>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {story.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="group flex items-start justify-between gap-4 py-3.5 hover:bg-paper"
              >
                <span>
                  <span className="block text-sm font-semibold">{s.outlet}</span>
                  <span lang={lang === 'fil' ? 'en' : undefined} className="block text-sm text-muted-foreground group-hover:text-foreground">
                    {s.title}
                  </span>
                  <span className="sr-only"> {t.opensNewTab}</span>
                </span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p id="ai-notice" className="mt-6 scroll-mt-6 text-sm leading-relaxed text-pretty text-muted-foreground">
        {t.aiNotice}{' '}
        {contact ? (
          <>
            {t.reportError}{' '}
            <a
              href={`mailto:${contact}?subject=${encodeURIComponent(`Correction: ${story.slug}`)}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {t.reportErrorCta}
            </a>
            .
          </>
        ) : (
          <Link href={`/${lang}/corrections`} className="font-medium text-foreground underline underline-offset-4">
            {t.correctionsHow}
          </Link>
        )}
      </p>

      <Suspense fallback={null}>
        <MoreStories lang={lang} slug={story.slug} category={story.category} />
      </Suspense>
      <DigestSignup locale={lang} />
    </article>
  );
}

function StorySkeleton() {
  return (
    <div className="mx-auto max-w-[42rem] animate-pulse space-y-4 py-10" aria-hidden>
      <div className="h-10 w-full rounded bg-muted" />
      <div className="h-10 w-2/3 rounded bg-muted" />
      <div className="h-6 w-48 rounded-full bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-4/5 rounded bg-muted" />
    </div>
  );
}

export default function StoryPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<StorySkeleton />}>
      <StoryBody params={params} />
    </Suspense>
  );
}
