import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale } from '@/lib/i18n';
import { CALCULATORS } from '@/lib/calculators';

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
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {CALCULATORS.map((c) => (
          <li key={c.slug} className="py-4">
            <Link href={`/${lang}/calculators/${c.slug}`} className="group block">
              <span className="font-serif text-xl font-semibold group-hover:underline">{c[lang].title}</span>
              <span className="mt-1 block leading-relaxed text-muted-foreground">{c[lang].description}</span>
            </Link>
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
