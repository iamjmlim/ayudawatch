import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { isLocale, type Locale } from '@/lib/i18n';
import { POLICY_UPDATED, PRIVACY } from '@/lib/legal-pages';
import { LegalPage } from '@/components/site/legal-page';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: PRIVACY[lang].title,
    description: PRIVACY[lang].description,
    alternates: { canonical: `/${lang}/privacy`, languages: hreflang({ en: '/en/privacy', fil: '/fil/privacy' }) },
  };
}

function updated(lang: Locale) {
  const d = new Intl.DateTimeFormat(lang === 'fil' ? 'fil-PH' : 'en-PH', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(`${POLICY_UPDATED}T00:00:00Z`),
  );
  return lang === 'fil' ? `Huling na-update: ${d}` : `Last updated: ${d}`;
}

async function Body({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage page={PRIVACY[lang]} meta={<time dateTime={POLICY_UPDATED}>{updated(lang)}</time>} />;
}

export default function PrivacyPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
