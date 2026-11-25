import { THEME_SCRIPT } from '@/lib/theme';
import type { Metadata } from 'next';
import { hreflang } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { Info } from 'lucide-react';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { getDictionary, isLocale, LOCALES } from '@/lib/i18n';
import '../globals.css';

const sans = Geist({ variable: '--font-ui', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const serif = Newsreader({ variable: '--font-serif', subsets: ['latin'], weight: ['500', '600', '700'] });

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    // The home page title names what people search for; other pages use the template.
    title: {
      default:
        lang === 'fil'
          ? `${t.siteName}: SSS, PhilHealth, Pag-IBIG, ayuda at mga calculator`
          : `${t.siteName}: SSS, PhilHealth, Pag-IBIG benefits, ayuda news and calculators`,
      template: `%s | ${t.siteName}`,
    },
    description: t.description,
    alternates: {
      canonical: `/${lang}`,
      languages: hreflang({ en: '/en', fil: '/fil' }),
      types: { 'application/rss+xml': `/${lang}/feed.xml` },
    },
    openGraph: { siteName: t.siteName, locale: lang === 'fil' ? 'fil_PH' : 'en_PH', type: 'website' },
    // Google Search Console ownership check; set GOOGLE_SITE_VERIFICATION in Vercel.
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang === 'fil' ? 'fil' : 'en'}
      className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}
      suppressHydrationWarning // data-theme is set by THEME_SCRIPT before React loads
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {getDictionary(lang).skipToContent}
        </a>
        {/* Shown on every page so no one mistakes this for an agency site: quiet, but always there. */}
        <div className="border-b border-border bg-paper">
          <p className="mx-auto flex w-full max-w-5xl items-start gap-1.5 px-4 py-1.5 text-xs leading-snug text-muted-foreground sm:px-6">
            <Info className="mt-px size-3.5 shrink-0" aria-hidden />
            {getDictionary(lang).notGov}
          </p>
        </div>
        <SiteHeader locale={lang} />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 outline-none sm:px-6">
          {children}
        </main>
        <SiteFooter locale={lang} />
        {/* Cookieless page-view counts (Vercel Web Analytics); no personal data, no consent banner needed. */}
        <Analytics />
      </body>
    </html>
  );
}
