import type { CategorySlug } from '../i18n';
import { pagibigMp2 } from './pagibig-mp2.ts';
import { philhealthSeniorCitizens } from './philhealth-senior-citizens.ts';
import { sssFuneralBenefit } from './sss-funeral-benefit.ts';
import { sssMaternityBenefit } from './sss-maternity-benefit.ts';
import { sssRetirementBenefit } from './sss-retirement-benefit.ts';
import { sssSalaryLoan } from './sss-salary-loan.ts';
import { sssSicknessBenefit } from './sss-sickness-benefit.ts';
import { sssUnemploymentBenefit } from './sss-unemployment-benefit.ts';
import { thirteenthMonthPay } from './thirteenth-month-pay.ts';
import type { Guide } from './types.ts';

export type { Guide, GuideSection, GuideText } from './types.ts';

// Add new guides here. Order = order on the Guides page.
export const GUIDES: Guide[] = [
  thirteenthMonthPay, // first while 13th month pay season lasts (Dec 24 deadline)
  sssSalaryLoan,
  sssRetirementBenefit,
  sssSicknessBenefit,
  sssMaternityBenefit,
  sssUnemploymentBenefit,
  sssFuneralBenefit,
  philhealthSeniorCitizens,
  pagibigMp2,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(category: CategorySlug): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}
