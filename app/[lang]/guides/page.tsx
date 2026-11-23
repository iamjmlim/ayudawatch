import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { CATEGORY_SLUGS, getDictionary, isLocale } from '@/lib/i18n';
import { GUIDES } from '@/lib/guides';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.guidesTitle,
    description: t.guidesIntro,
    alternates: { canonical: `/${lang}/guides`, languages: hreflang({ en: '/en/guides', fil: '/fil/guides' }) },
  };
}

async function GuidesBody({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const groups = CATEGORY_SLUGS.map((c) => ({ c, guides: GUIDES.filter((g) => g.category === c) })).filter(
    (x) => x.guides.length > 0,
  );

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance">{t.guidesTitle}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{t.guidesIntro}</p>

      {groups.map(({ c, guides }) => (
        <section key={c} className="mt-10" aria-labelledby={`g-${c}`}>
          <h2 id={`g-${c}`} className="border-b border-border pb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {t.categories[c]}
          </h2>
          <ul className="divide-y divide-border">
            {guides.map((g) => (
              <li key={g.slug} className="py-4">
                <Link href={`/${lang}/guides/${g.slug}`} className="group block">
                  <span className="font-serif text-xl font-semibold group-hover:underline">{g[lang].title}</span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">{g[lang].description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function GuidesPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <GuidesBody params={params} />
    </Suspense>
  );
}
