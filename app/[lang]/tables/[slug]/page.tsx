import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator, ExternalLink, ShieldCheck } from 'lucide-react';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { TABLES, getTable } from '@/lib/tables';
import { SssContributionTable } from '@/components/tables/sss-table';
import { PagibigTable, PhilhealthTables } from '@/components/tables/simple-tables';

type Params = Promise<{ lang: string; slug: string }>;

export async function generateStaticParams() {
  return TABLES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const table = getTable(slug);
  if (!isLocale(lang) || !table) return {};
  const text = table[lang];
  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: `/${lang}/tables/${slug}`,
      languages: hreflang({ en: `/en/tables/${slug}`, fil: `/fil/tables/${slug}` }),
    },
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

async function Body({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const table = getTable(slug);
  if (!isLocale(lang) || !table) notFound();
  const t = getDictionary(lang);
  const text = table[lang];

  return (
    <article className="mx-auto max-w-3xl py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href={`/${lang}/calculators`} className="hover:underline">
          {t.calculators}
        </Link>
        <span aria-hidden> / </span>
        <Link href={`/${lang}/${table.category}`} className="hover:underline">
          {t.categories[table.category]}
        </Link>
      </nav>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-balance">{text.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{text.intro}</p>

      <aside className="mt-6 rounded-lg border border-border bg-paper px-5 py-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          <time dateTime={table.checkedOn}>{t.guideChecked(formatDate(table.checkedOn, lang))}</time>
        </p>
        <ul className="mt-2 space-y-1">
          {table.sources.map((s) => (
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

      <Link
        href={`/${lang}/calculators/contributions`}
        className="mt-6 flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 px-5 py-3 font-medium text-primary hover:bg-paper"
      >
        <Calculator className="size-5 shrink-0" aria-hidden />
        {lang === 'fil' ? 'Kuwentahin ang SSS, PhilHealth at Pag-IBIG mo nang sabay' : 'Compute your SSS, PhilHealth and Pag-IBIG at once'} →
      </Link>

      <div className="mt-8">
        {table.slug === 'sss-contribution-table' && <SssContributionTable locale={lang} />}
        {table.slug === 'philhealth-contribution-table' && <PhilhealthTables locale={lang} />}
        {table.slug === 'pagibig-contribution-table' && <PagibigTable locale={lang} />}
      </div>

      <p className="mt-12 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{t.guideNotice}</p>
    </article>
  );
}

export default function TablePage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
