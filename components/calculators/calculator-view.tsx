'use client';

import { useRef } from 'react';
import type { Calculator } from '@/lib/calculators';
import type { Locale } from '@/lib/i18n';
import { ContributionsCalculator } from './contributions';
import { HolidayPayCalculator } from './holiday-pay';
import { PagibigMp2Calculator } from './pagibig-mp2';
import { SssDailyBenefitCalculator } from './sss-daily-benefit';
import { SssPensionCalculator } from './sss-pension';
import { TakeHomePayCalculator } from './take-home-pay';
import { OvertimePayCalculator } from './overtime-pay';
import { SeparationPayCalculator } from './separation-pay';
import { RetirementPayCalculator } from './retirement-pay';
import { ThirteenthMonthCalculator } from './thirteenth-month';

function CalculatorBySlug({ slug, locale }: { slug: Calculator['slug']; locale: Locale }) {
  if (slug === 'sss-pension') return <SssPensionCalculator locale={locale} />;
  if (slug === 'sss-maternity') return <SssDailyBenefitCalculator locale={locale} mode="maternity" />;
  if (slug === 'pagibig-mp2') return <PagibigMp2Calculator locale={locale} />;
  if (slug === 'contributions') return <ContributionsCalculator locale={locale} />;
  if (slug === 'thirteenth-month') return <ThirteenthMonthCalculator locale={locale} />;
  if (slug === 'overtime-pay') return <OvertimePayCalculator locale={locale} />;
  if (slug === 'separation-pay') return <SeparationPayCalculator locale={locale} />;
  if (slug === 'retirement-pay') return <RetirementPayCalculator locale={locale} />;
  if (slug === 'take-home-pay') return <TakeHomePayCalculator locale={locale} />;
  if (slug === 'holiday-pay') return <HolidayPayCalculator locale={locale} />;
  return <SssDailyBenefitCalculator locale={locale} mode="sickness" />;
}

export function CalculatorView({ slug, locale }: { slug: Calculator['slug']; locale: Locale }) {
  // Count one anonymous use the first time someone types or picks something on this page.
  const counted = useRef(false);
  const count = () => {
    if (counted.current) return;
    counted.current = true;
    try {
      navigator.sendBeacon('/api/calc-use', slug);
    } catch {
      // Counting is best-effort.
    }
  };
  return (
    <div onInput={count} onChange={count}>
      <CalculatorBySlug slug={slug} locale={locale} />
    </div>
  );
}
