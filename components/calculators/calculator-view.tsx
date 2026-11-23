'use client';

import type { Calculator } from '@/lib/calculators';
import type { Locale } from '@/lib/i18n';
import { ContributionsCalculator } from './contributions';
import { PagibigMp2Calculator } from './pagibig-mp2';
import { SssDailyBenefitCalculator } from './sss-daily-benefit';
import { SssPensionCalculator } from './sss-pension';

export function CalculatorView({ slug, locale }: { slug: Calculator['slug']; locale: Locale }) {
  if (slug === 'sss-pension') return <SssPensionCalculator locale={locale} />;
  if (slug === 'sss-maternity') return <SssDailyBenefitCalculator locale={locale} mode="maternity" />;
  if (slug === 'pagibig-mp2') return <PagibigMp2Calculator locale={locale} />;
  if (slug === 'contributions') return <ContributionsCalculator locale={locale} />;
  return <SssDailyBenefitCalculator locale={locale} mode="sickness" />;
}
