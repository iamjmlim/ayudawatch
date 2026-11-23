import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { CATEGORY_SLUGS, getDictionary, isLocale } from '@/lib/i18n';
import { GUIDES } from '@/lib/guides';
import { Calculator, ListChecks } from 'lucide-react';
import { LinkCard } from '@/components/site/link-card';

// Secondary actions styled as outlined pill buttons so they read as clickable on touch screens.
const pill =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/50 px-4 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none';

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
      <p className="mt-5 flex flex-wrap gap-3">
        <Link href={`/${lang}/which-benefits`} className={pill}>
          <ListChecks className="size-4" aria-hidden />
          {t.checkerTitle}
        </Link>
        <Link href={`/${lang}/calculators`} className={pill}>
          <Calculator className="size-4" aria-hidden />
          {t.calculatorsTitle}
        </Link>
      </p>

      {groups.map(({ c, guides }) => (
        <section key={c} className="mt-10" aria-labelledby={`g-${c}`}>
          <h2 id={`g-${c}`} className="border-b border-border pb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {t.categories[c]}
          </h2>
          <ul className="mt-4 grid gap-3">
            {guides.map((g) => (
              <li key={g.slug}>
                <LinkCard href={`/${lang}/guides/${g.slug}`} title={g[lang].title} description={g[lang].description} />
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
