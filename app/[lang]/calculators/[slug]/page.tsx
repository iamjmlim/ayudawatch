import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator as CalcIcon, ExternalLink } from 'lucide-react';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale } from '@/lib/i18n';
import { CALCULATORS, getCalculator } from '@/lib/calculators';
import { CalculatorView } from '@/components/calculators/calculator-view';
import { TABLES } from '@/lib/tables';

type Params = Promise<{ lang: string; slug: string }>;

export async function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const calc = getCalculator(slug);
  if (!isLocale(lang) || !calc) return {};
  const text = calc[lang];
  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: `/${lang}/calculators/${slug}`,
      languages: hreflang({ en: `/en/calculators/${slug}`, fil: `/fil/calculators/${slug}` }),
    },
  };
}

async function Body({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const calc = getCalculator(slug);
  if (!isLocale(lang) || !calc) notFound();
  const t = getDictionary(lang);
  const text = calc[lang];

  return (
    <article className="mx-auto max-w-2xl py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href={`/${lang}/calculators`} className="hover:underline">
          {t.calculators}
        </Link>
        <span aria-hidden> / </span>
        <Link href={`/${lang}/${calc.category}`} className="hover:underline">
          {t.categories[calc.category]}
        </Link>
      </nav>
      <h1 className="mt-3 flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-balance">
        <CalcIcon className="size-8 shrink-0 text-primary" aria-hidden />
        {text.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{text.intro}</p>

      <div className="mt-8">
        <CalculatorView slug={calc.slug} locale={lang} />
      </div>

      <aside className="mt-10 rounded-lg border border-border px-5 py-4 text-sm leading-relaxed">
        <p className="text-muted-foreground">{t.calcNotice}</p>
        <ul className="mt-3 space-y-1">
          {calc.sources.map((s) => (
            <li key={s.url}>
              <span className="text-muted-foreground">{t.guideSource}: </span>
              <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline">
                {s.name}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only"> {t.opensNewTab}</span>
              </a>
            </li>
          ))}
          {calc.guideSlug && (
            <li>
              <Link href={`/${lang}/guides/${calc.guideSlug}`} className="font-medium text-primary underline-offset-4 hover:underline">
                {t.calcGuide} →
              </Link>
            </li>
          )}
          {calc.slug === 'contributions' &&
            TABLES.map((tb) => (
              <li key={tb.slug}>
                <Link href={`/${lang}/tables/${tb.slug}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {tb[lang].title} →
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </article>
  );
}

export default function CalculatorPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
