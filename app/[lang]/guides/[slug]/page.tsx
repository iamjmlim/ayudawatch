import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { GUIDES, getGuide, type GuideSection } from '@/lib/guides';

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
    openGraph: { title: text.title, description: text.description, type: 'article' },
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

function Section({ s }: { s: GuideSection }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{s.heading}</h2>
      {s.text && <p className="mt-3 leading-relaxed">{s.text}</p>}
      {s.points && (
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-primary">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {s.steps && (
        <ol className="mt-4 space-y-4">
          {s.steps.map((p, i) => (
            <li key={p} className="grid grid-cols-[2rem_1fr] gap-x-2 leading-relaxed">
              <span className="font-serif text-xl leading-tight font-semibold text-primary">{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      )}
      {s.note && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.note}</p>}
    </section>
  );
}

async function GuideBody({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(lang) || !guide) notFound();
  const t = getDictionary(lang);
  const text = guide[lang];
  const checked = formatDate(guide.checkedOn, lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: text.title,
    description: text.description,
    inLanguage: lang === 'fil' ? 'fil' : 'en',
    dateModified: guide.checkedOn,
    mainEntityOfPage: `${SITE_URL}/${lang}/guides/${slug}`,
    publisher: { '@type': 'Organization', name: 'AyudaWatch', url: SITE_URL },
    citation: guide.sources.map((s) => s.url),
  };

  return (
    <article className="mx-auto max-w-2xl py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href={`/${lang}/guides`} className="hover:underline">
          {t.guides}
        </Link>
        <span aria-hidden> / </span>
        <Link href={`/${lang}/${guide.category}`} className="hover:underline">
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
              <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline">
                {s.name}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only"> {t.opensNewTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {text.sections.map((s) => (
        <Section key={s.heading} s={s} />
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
