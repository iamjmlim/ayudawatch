import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale } from '@/lib/i18n';
import { CALCULATORS } from '@/lib/calculators';
import { TABLES } from '@/lib/tables';
import { Calculator as CalcIcon, Table2 } from 'lucide-react';
import { LinkCard } from '@/components/site/link-card';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.calculatorsTitle,
    description: t.calculatorsIntro,
    alternates: { canonical: `/${lang}/calculators`, languages: hreflang({ en: '/en/calculators', fil: '/fil/calculators' }) },
  };
}

async function Body({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance">{t.calculatorsTitle}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{t.calculatorsIntro}</p>
      <ul className="mt-8 grid gap-3">
        {CALCULATORS.map((c) => (
          <li key={c.slug}>
            <LinkCard
              href={`/${lang}/calculators/${c.slug}`}
              title={c[lang].title}
              description={c[lang].description}
              icon={<CalcIcon className="size-6" aria-hidden />}
            />
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-serif text-2xl font-semibold">{lang === 'fil' ? 'Mga contribution table' : 'Contribution tables'}</h2>
      <ul className="mt-4 grid gap-3">
        {TABLES.map((tb) => (
          <li key={tb.slug}>
            <LinkCard
              href={`/${lang}/tables/${tb.slug}`}
              title={tb[lang].title}
              description={tb[lang].description}
              icon={<Table2 className="size-6" aria-hidden />}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CalculatorsPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
