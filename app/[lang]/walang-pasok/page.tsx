import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale } from '@/lib/i18n';
import { getLatestStories } from '@/lib/news';
import { StoryList, StoryListSkeleton } from '@/components/site/story-list';

type Params = Promise<{ lang: string }>;

const WINDOW_HOURS = 36;
// Class or work suspension announcements, in English or Filipino.
const SUSPENSION = /walang pasok|suspen(d|sion|syon|siyon)|no (face-to-face )?classes|class(es)? (are |were )?(called off|cancelled)|work suspension/i;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.suspensionsTitle,
    description: t.suspensionsIntro,
    alternates: { canonical: `/${lang}/walang-pasok`, languages: hreflang({ en: '/en/walang-pasok', fil: '/fil/walang-pasok' }) },
  };
}

async function Suspensions({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const stories = await getLatestStories(lang, undefined, 80);
  await connection(); // the time window depends on the current time
  const since = Date.now() - WINDOW_HOURS * 3_600_000;
  const recent = stories.filter(
    (s) =>
      Date.parse(s.publishedAt) >= since &&
      (s.category === 'eskwela' || s.category === 'holiday' || s.category === 'trabaho') &&
      SUSPENSION.test(`${s.headline} ${s.summary}`),
  );

  return recent.length === 0 ? (
    <p className="mt-8 rounded-lg border border-border px-5 py-4 text-muted-foreground">{t.suspensionsNone}</p>
  ) : (
    <StoryList stories={recent} locale={lang} lead={false} />
  );
}

async function Heading({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <h1 className="border-b border-border pt-7 pb-4 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{t.suspensionsTitle}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-muted-foreground">{t.suspensionsIntro}</p>
    </>
  );
}

export default function WalangPasokPage({ params }: { params: Params }) {
  return (
    <>
      <Suspense fallback={null}>
        <Heading params={params} />
      </Suspense>
      <Suspense fallback={<StoryListSkeleton />}>
        <Suspensions params={params} />
      </Suspense>
    </>
  );
}
