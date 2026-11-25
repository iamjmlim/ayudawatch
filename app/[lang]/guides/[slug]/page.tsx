import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator, ExternalLink, ShieldCheck } from 'lucide-react';
import { CALCULATORS } from '@/lib/calculators';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { GUIDES, getGuide } from '@/lib/guides';
import { GuideSection } from '@/components/site/guide-section';
import { breadcrumbs, graph } from '@/lib/structured-data';

type Params = Promise<{ lang: string; slug: string }>;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(lang) || !guide) return {};
  const text = guide[lang];
  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: `/${lang}/guides/${slug}`,
      languages: hreflang({ en: `/en/guides/${slug}`, fil: `/fil/guides/${slug}` }),
    },
    // Setting openGraph here replaces the parent's, so the default share card is named explicitly.
    openGraph: {
      title: text.title,
      description: text.description,
      type: 'article',
      images: [{ url: `/${lang}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

async function GuideBody({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(lang) || !guide) notFound();
  const t = getDictionary(lang);
  const text = guide[lang];
  const checked = formatDate(guide.checkedOn, lang);
  const calc = CALCULATORS.find((c) => c.guideSlug === guide.slug);

  const jsonLd = graph(
    {
    '@type': 'Article',
    headline: text.title,
    description: text.description,
    inLanguage: lang === 'fil' ? 'fil' : 'en',
    dateModified: guide.checkedOn,
    mainEntityOfPage: `${SITE_URL}/${lang}/guides/${slug}`,
    publisher: { '@type': 'Organization', name: 'AyudaWatch', url: SITE_URL },
    citation: guide.sources.map((s) => s.url),
    },
    breadcrumbs(lang, [
      ['AyudaWatch', ''],
      [t.guides, '/guides'],
      [text.title, '/guides/' + slug],
    ]),
  );

  return (
    <article className="mx-auto max-w-2xl py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href={`/${lang}/guides`} className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
          {t.guides}
        </Link>
        <span aria-hidden> / </span>
        <Link href={`/${lang}/${guide.category}`} className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
          {t.categories[guide.category]}
        </Link>
      </nav>

      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-balance">{text.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{text.intro}</p>

      <aside className="mt-6 rounded-lg border border-border bg-paper px-5 py-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          <time dateTime={guide.checkedOn}>{t.guideChecked(checked)}</time>
        </p>
        <ul className="mt-2 space-y-1">
          {guide.sources.map((s) => (
            <li key={s.url}>
              <span className="text-muted-foreground">{t.guideSource}: </span>
              <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                {s.name}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only"> {t.opensNewTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {calc && (
        <Link
          href={`/${lang}/calculators/${calc.slug}`}
          className="mt-6 flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 px-5 py-3 font-medium text-primary hover:bg-paper"
        >
          <Calculator className="size-5 shrink-0" aria-hidden />
          {t.calcCta}: {calc[lang].title} →
        </Link>
      )}

      {text.sections.map((s) => (
        <GuideSection key={s.heading} s={s} />
      ))}

      <p className="mt-12 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{t.guideNotice}</p>
    </article>
  );
}

export default function GuidePage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <GuideBody params={params} />
    </Suspense>
  );
}
