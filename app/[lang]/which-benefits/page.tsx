import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hreflang } from '@/lib/seo';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { getGuide } from '@/lib/guides';
import { getCalculator } from '@/lib/calculators';
import { BenefitChecker, type CheckerItem } from '@/components/site/benefit-checker';

type Params = Promise<{ lang: string }>;

// Situation -> the guides and calculators that cover it.
const SITUATIONS: { key: string; en: string; fil: string; guides: string[]; calculators: string[] }[] = [
  { key: '13th', en: 'I am a private-sector employee and want to know my 13th month pay', fil: 'Empleyado ako sa pribadong sektor at gusto kong malaman ang 13th month pay ko', guides: ['thirteenth-month-pay'], calculators: ['thirteenth-month'] },
  { key: 'loan', en: 'I need a short-term cash loan and I am an SSS member', fil: 'Kailangan ko ng panandaliang cash loan at miyembro ako ng SSS', guides: ['sss-salary-loan'], calculators: [] },
  { key: 'pregnant', en: 'I am pregnant, gave birth, or had a miscarriage', fil: 'Buntis ako, nanganak, o nakunan', guides: ['sss-maternity-benefit'], calculators: ['sss-maternity'] },
  { key: 'sick', en: 'I am sick or injured and cannot work for 4 days or more', fil: 'May sakit o pinsala ako at hindi makapagtrabaho nang 4 na araw o higit pa', guides: ['sss-sickness-benefit'], calculators: ['sss-sickness'] },
  { key: 'jobloss', en: 'I lost my job through no choice of my own', fil: 'Nawalan ako ng trabaho nang hindi ko kagustuhan', guides: ['sss-unemployment-benefit'], calculators: [] },
  { key: 'retire', en: 'I am 60 or older and want to retire', fil: '60 taong gulang na ako o higit pa at gusto kong magretiro', guides: ['sss-retirement-benefit'], calculators: ['sss-pension'] },
  { key: 'senior', en: 'I am 60 or older and not yet covered by PhilHealth', fil: '60 taong gulang na ako o higit pa at hindi pa sakop ng PhilHealth', guides: ['philhealth-senior-citizens'], calculators: [] },
  { key: 'save', en: 'I want to save more and earn tax-free dividends with Pag-IBIG', fil: 'Gusto kong mag-ipon pa at kumita ng dibidendong walang buwis sa Pag-IBIG', guides: ['pagibig-mp2'], calculators: ['pagibig-mp2'] },
  { key: 'funeral', en: 'An SSS member in my family died and I paid for the funeral', fil: 'Namatay ang miyembro ng SSS sa pamilya ko at ako ang nagbayad ng libing', guides: ['sss-funeral-benefit'], calculators: [] },
];

function itemsFor(lang: Locale): CheckerItem[] {
  return SITUATIONS.map((s) => ({
    key: s.key,
    label: s[lang],
    links: [
      ...s.calculators.flatMap((slug) => {
        const c = getCalculator(slug);
        return c ? [{ href: `/${lang}/calculators/${slug}`, title: c[lang].title, kind: 'calculator' as const }] : [];
      }),
      ...s.guides.flatMap((slug) => {
        const g = getGuide(slug);
        return g ? [{ href: `/${lang}/guides/${slug}`, title: g[lang].title, kind: 'guide' as const }] : [];
      }),
    ],
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.checkerTitle,
    description: t.checkerIntro,
    alternates: { canonical: `/${lang}/which-benefits`, languages: hreflang({ en: '/en/which-benefits', fil: '/fil/which-benefits' }) },
  };
}

async function Body({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance">{t.checkerTitle}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{t.checkerIntro}</p>
      <div className="mt-8">
        <BenefitChecker items={itemsFor(lang)} resultsTitle={t.checkerResults} noneText={t.checkerNone} />
      </div>
      <p className="mt-10 border-t border-border pt-4 text-sm text-muted-foreground">{t.notGov}</p>
    </div>
  );
}

export default function WhichBenefitsPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}
