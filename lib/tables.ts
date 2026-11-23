import type { CategorySlug } from './i18n.ts';
import { CONTRIBUTIONS_CHECKED_ON, SOURCES } from './contributions.ts';

// Official contribution tables, rendered from lib/contributions.ts.

export type TableText = { title: string; description: string; intro: string };
export type ContributionTable = {
  slug: 'sss-contribution-table' | 'philhealth-contribution-table' | 'pagibig-contribution-table';
  category: CategorySlug;
  checkedOn: string;
  sources: { name: string; url: string }[];
  en: TableText;
  fil: TableText;
};

export const TABLES: ContributionTable[] = [
  {
    slug: 'sss-contribution-table',
    category: 'sss-gsis',
    checkedOn: CONTRIBUTIONS_CHECKED_ON,
    sources: [SOURCES.sss],
    en: {
      title: 'SSS contribution table 2026 (current schedule, effective January 2025)',
      description:
        'The full SSS contribution table for employees, kasambahay, self-employed, voluntary and OFW members: 15% rate, ₱5,000 to ₱35,000 salary credit, employer and employee shares.',
      intro:
        'This is the SSS contribution schedule that took effect in January 2025 and is still listed as current on the SSS website. Pick your membership type to see your monthly salary credit (MSC) and how much you and your employer pay.',
    },
    fil: {
      title: 'SSS contribution table 2026 (kasalukuyang schedule, epektibo Enero 2025)',
      description:
        'Buong SSS contribution table para sa empleyado, kasambahay, self-employed, voluntary at OFW: 15% na rate, ₱5,000 hanggang ₱35,000 na salary credit, hati ng employer at empleyado.',
      intro:
        'Ito ang SSS contribution schedule na nagsimula noong Enero 2025 at nakalista pa ring kasalukuyan sa website ng SSS. Piliin ang uri ng membership mo para makita ang monthly salary credit (MSC) at kung magkano ang hulog mo at ng employer mo.',
    },
  },
  {
    slug: 'philhealth-contribution-table',
    category: 'philhealth',
    checkedOn: CONTRIBUTIONS_CHECKED_ON,
    sources: [SOURCES.philhealth],
    en: {
      title: 'PhilHealth contribution table: latest official premium rate (5%)',
      description:
        'PhilHealth’s latest published premium schedule: 5% of monthly basic salary, ₱500 minimum and ₱5,000 maximum, with the official rates since 2019.',
      intro:
        'PhilHealth’s premium is a percentage of your monthly basic salary, with a floor and a ceiling. This is PhilHealth’s latest published schedule (Circular 2019-0009). Its last row covers 2024 to 2025; as of our last check, PhilHealth had not published a different rate on that table.',
    },
    fil: {
      title: 'PhilHealth contribution table: pinakabagong opisyal na premium rate (5%)',
      description:
        'Pinakabagong inilathalang premium schedule ng PhilHealth: 5% ng buwanang basic salary, ₱500 minimum at ₱5,000 maximum, kasama ang mga opisyal na rate mula 2019.',
      intro:
        'Ang premium sa PhilHealth ay porsyento ng buwanang basic salary mo, na may floor at ceiling. Ito ang pinakabagong inilathalang schedule ng PhilHealth (Circular 2019-0009). Ang huling hanay nito ay para sa 2024 hanggang 2025; sa huling pagsusuri namin, wala pang ibang rate na inilathala ang PhilHealth sa table na iyon.',
    },
  },
  {
    slug: 'pagibig-contribution-table',
    category: 'pabahay',
    checkedOn: CONTRIBUTIONS_CHECKED_ON,
    sources: [SOURCES.pagibig],
    en: {
      title: 'Pag-IBIG contribution 2026: ₱200 monthly (2% of up to ₱10,000)',
      description:
        'How much Pag-IBIG takes each month since February 2024: 2% of salary up to ₱10,000 (₱200) matched by your employer, ₱200 for OFWs and ₱400 for self-employed members.',
      intro:
        'Since February 2024, Pag-IBIG monthly savings are based on a Maximum Fund Salary of ₱10,000. Here is what members and employers pay, according to the official Pag-IBIG page.',
    },
    fil: {
      title: 'Pag-IBIG contribution 2026: ₱200 kada buwan (2% ng hanggang ₱10,000)',
      description:
        'Magkano ang hulog sa Pag-IBIG kada buwan mula Pebrero 2024: 2% ng sahod hanggang ₱10,000 (₱200) na tinatapatan ng employer, ₱200 sa OFW at ₱400 sa self-employed.',
      intro:
        'Mula Pebrero 2024, ang buwanang hulog sa Pag-IBIG ay batay sa Maximum Fund Salary na ₱10,000. Narito ang hulog ng mga miyembro at employer, ayon sa opisyal na pahina ng Pag-IBIG.',
    },
  },
];

export function getTable(slug: string) {
  return TABLES.find((t) => t.slug === slug);
}
