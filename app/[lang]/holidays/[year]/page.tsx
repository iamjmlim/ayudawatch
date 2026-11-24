import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator, ExternalLink, ShieldCheck } from 'lucide-react';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { HOLIDAY_PAY_CHECKED_ON, HOLIDAY_PAY_SOURCES, HOLIDAYS_2027_SOURCES, HOLIDAYS_BY_YEAR, longWeekends, type DayType } from '@/lib/holiday-pay';

type Params = Promise<{ lang: string; year: string }>;
const YEARS = Object.keys(HOLIDAYS_BY_YEAR);

export async function generateStaticParams() {
  return YEARS.map((year) => ({ year }));
}

const COPY = {
  en: {
    title: (y: string) => `Philippine holidays ${y}: complete list and long weekends`,
    description: (y: string) =>
      `All ${y} regular holidays, special non-working days and long weekends in the Philippines, from the official proclamation, with holiday pay rates.`,
    intro: (y: string, p: string) => `The official list of ${y} holidays in the Philippines, from ${p}. Eid’l Fitr and Eid’l Adha are proclaimed separately once their dates are set.`,
    all: 'All holidays',
    long: 'Long weekends',
    longNote: 'Breaks of 3 days or more, counting Saturdays, Sundays, regular holidays and special non-working days.',
    days: (n: number) => `${n} days`,
    types: { regular: 'Regular holiday', special: 'Special (non-working) day', 'special-working': 'Special (working) day' } satisfies Record<DayType, string>,
    pay: 'Holiday pay at a glance',
    payPoints: [
      'Regular holiday: 200% if you work (first 8 hours); 100% if you don’t, if you were present or on paid leave the workday before.',
      'Special (non-working) day: 130% if you work; “no work, no pay” if you don’t, unless company policy says otherwise.',
      'Special (working) day: an ordinary working day.',
    ],
    calc: 'Compute your holiday pay',
    other: (y: string) => `See the ${y} holidays`,
  },
  fil: {
    title: (y: string) => `Mga holiday sa Pilipinas ${y}: kumpletong listahan at long weekends`,
    description: (y: string) =>
      `Lahat ng regular holiday, special non-working day at long weekend sa Pilipinas sa ${y}, mula sa opisyal na proklamasyon, kasama ang holiday pay.`,
    intro: (y: string, p: string) => `Ang opisyal na listahan ng mga holiday sa Pilipinas sa ${y}, mula sa ${p}. Hiwalay na ipinoproklama ang Eid’l Fitr at Eid’l Adha kapag naitakda na ang petsa.`,
    all: 'Lahat ng holiday',
    long: 'Mga long weekend',
    longNote: 'Mga bakasyong 3 araw o higit pa, kasama ang Sabado, Linggo, regular holiday at special non-working day.',
    days: (n: number) => `${n} araw`,
    types: { regular: 'Regular holiday', special: 'Special (non-working) day', 'special-working': 'Special (working) day' } satisfies Record<DayType, string>,
    pay: 'Holiday pay sa madaling salita',
    payPoints: [
      'Regular holiday: 200% kung nagtrabaho (unang 8 oras); 100% kung hindi, basta pumasok o naka-paid leave sa araw ng trabaho bago nito.',
      'Special (non-working) day: 130% kung nagtrabaho; “no work, no pay” kung hindi, maliban kung iba ang patakaran ng kompanya.',
      'Special (working) day: ordinaryong araw ng trabaho.',
    ],
    calc: 'Kuwentahin ang holiday pay mo',
    other: (y: string) => `Tingnan ang mga holiday sa ${y}`,
  },
};

const PROCLAMATION: Record<string, string> = { '2026': 'Proclamation No. 1006, s. 2025', '2027': 'Proclamation No. 1427, s. 2026' };

function fmt(iso: string, locale: Locale, withWeekday = true) {
  return new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    ...(withWeekday ? { weekday: 'long' as const } : {}),
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, year } = await params;
  if (!isLocale(lang) || !HOLIDAYS_BY_YEAR[year]) return {};
  const c = COPY[lang];
  return {
    title: c.title(year),
    description: c.description(year),
    alternates: { canonical: `/${lang}/holidays/${year}`, languages: hreflang({ en: `/en/holidays/${year}`, fil: `/fil/holidays/${year}` }) },
  };
}

async function Body({ params }: { params: Params }) {
  const { lang, year } = await params;
  const holidays = HOLIDAYS_BY_YEAR[year];
  if (!isLocale(lang) || !holidays) notFound();
  const t = getDictionary(lang);
  const c = COPY[lang];
  const sources = year === '2027' ? HOLIDAYS_2027_SOURCES : HOLIDAY_PAY_SOURCES;
  const otherYear = YEARS.find((y) => y !== year);
  const badge: Record<DayType, string> = {
    regular: 'bg-primary/15 text-primary',
    special: 'bg-highlight/25 text-foreground',
    'special-working': 'bg-muted text-muted-foreground',
  };

  return (
    <article className="mx-auto max-w-3xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance">{c.title(year)}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{c.intro(year, PROCLAMATION[year])}</p>

      <aside className="mt-6 rounded-lg border border-border bg-paper px-5 py-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          {t.guideChecked(fmt(HOLIDAY_PAY_CHECKED_ON, lang, false) + ', ' + HOLIDAY_PAY_CHECKED_ON.slice(0, 4))}
        </p>
        <ul className="mt-2 space-y-1">
          {sources.map((s) => (
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

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold">{c.long}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{c.longNote}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {longWeekends(year).map((r) => (
            <li key={r.start} className="rounded-lg border border-border px-4 py-3">
              <p className="font-semibold">
                {r.end.slice(0, 4) !== r.start.slice(0, 4)
                  ? `${fmt(r.start, lang, false)}, ${r.start.slice(0, 4)} – ${fmt(r.end, lang, false)}, ${r.end.slice(0, 4)}`
                  : `${fmt(r.start, lang, false)} – ${fmt(r.end, lang, false)}`}{' '}
                <span className="font-normal text-muted-foreground">· {c.days(r.days)}</span>
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{r.holidays.map((h) => h[lang]).join(', ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold">{c.all}</h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
          {holidays.map((h) => (
            <li key={h.date} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3">
              <span>
                <span className="font-semibold">{h[lang]}</span>
                <span className="block text-sm text-muted-foreground">{fmt(h.date, lang)}</span>
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge[h.type]}`}>{c.types[h.type]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg bg-paper px-5 py-4">
        <h2 className="font-serif text-xl font-semibold">{c.pay}</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-primary">
          {c.payPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <Link
          href={`/${lang}/calculators/holiday-pay`}
          className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-background px-4 py-2.5 font-medium text-primary hover:border-primary"
        >
          <Calculator className="size-5 shrink-0" aria-hidden />
          {c.calc} →
        </Link>
      </section>

      {otherYear && (
        <p className="mt-8">
          <Link href={`/${lang}/holidays/${otherYear}`} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
            {c.other(otherYear)} →
          </Link>
        </p>
      )}
      <p className="mt-10 border-t border-border pt-4 text-sm text-muted-foreground">{t.notGov}</p>
    </article>
  );
}

export default function HolidaysPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
