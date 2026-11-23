import type { CategorySlug } from '../i18n';
import { philhealthSeniorCitizens } from './philhealth-senior-citizens';
import { sssFuneralBenefit } from './sss-funeral-benefit';
import { sssMaternityBenefit } from './sss-maternity-benefit';
import { sssRetirementBenefit } from './sss-retirement-benefit';
import { sssSalaryLoan } from './sss-salary-loan';
import { sssSicknessBenefit } from './sss-sickness-benefit';
import { sssUnemploymentBenefit } from './sss-unemployment-benefit';
import type { Guide } from './types';

export type { Guide, GuideSection, GuideText } from './types';

// Add new guides here. Order = order on the Guides page.
export const GUIDES: Guide[] = [
  sssSalaryLoan,
  sssRetirementBenefit,
  sssSicknessBenefit,
  sssMaternityBenefit,
  sssUnemploymentBenefit,
  sssFuneralBenefit,
  philhealthSeniorCitizens,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(category: CategorySlug): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}
