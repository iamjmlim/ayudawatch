import type { CategorySlug } from '../i18n';
import { sssSalaryLoan } from './sss-salary-loan';
import type { Guide } from './types';

export type { Guide, GuideSection, GuideText } from './types';

// Add new guides here. Order = order on the Guides page.
export const GUIDES: Guide[] = [sssSalaryLoan];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(category: CategorySlug): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}
