import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { hreflang } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';
import { CONTACT, FB_PAGE_URL } from '@/lib/legal-pages';
import { LegalPage } from '@/components/site/legal-page';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: CONTACT[lang].title,
    description: CONTACT[lang].description,
    alternates: { canonical: `/${lang}/contact`, languages: hreflang({ en: '/en/contact', fil: '/fil/contact' }) },
  };
}

async function Body({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = CONTACT[lang];
  return (
    <LegalPage page={c}>
      <a
        href={FB_PAGE_URL}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <MessageCircle className="size-5" aria-hidden />
        {c.button}
      </a>
      <p className="mt-2 text-sm text-muted-foreground">{c.responseNote}</p>
    </LegalPage>
  );
}

export default function ContactPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
