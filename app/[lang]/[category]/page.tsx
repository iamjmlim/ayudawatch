import { Suspense } from 'react';
import type { Metadata } from 'next';
import { hreflang } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { StoryList, StoryListSkeleton } from '@/components/site/story-list';
import { OfficialLinks } from '@/components/site/official-links';
import { GuideLinks } from '@/components/site/guide-links';
import { CATEGORY_SLUGS, getDictionary, isCategory, isLocale } from '@/lib/i18n';
import { getLatestStories } from '@/lib/news';

type Params = Promise<{ lang: string; category: string }>;

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, category } = await params;
  if (!isLocale(lang) || !isCategory(category)) return {};
  const t = getDictionary(lang);
  return {
    title: t.categories[category],
    alternates: { canonical: `/${lang}/${category}`, languages: hreflang({ en: `/en/${category}`, fil: `/fil/${category}` }) },
  };
}

async function CategoryStories({ params }: { params: Params }) {
  const { lang, category } = await params;
  if (!isLocale(lang) || !isCategory(category)) notFound();
  const t = getDictionary(lang);
  const stories = await getLatestStories(lang, category);
  return (
    <>
      <h1 className="border-b border-border pt-7 pb-4 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.categories[category]}
      </h1>
      <OfficialLinks category={category} locale={lang} />
      <GuideLinks category={category} locale={lang} />
      <StoryList stories={stories} locale={lang} lead={false} category={category} />
    </>
  );
}

export default function CategoryPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<StoryListSkeleton />}>
      <CategoryStories params={params} />
    </Suspense>
  );
}
