import { LABOR_CHECKED_ON, LABOR_CODE_SOURCE } from '../labor.ts';
import type { Guide } from './types';

// From the Labor Code, Art. 287 (now 302) as amended by RA 7641, full text on LawPhil (read 2026-11-25).
export const retirementPayGuide: Guide = {
  slug: 'retirement-pay',
  category: 'trabaho',
  checkedOn: LABOR_CHECKED_ON,
  sources: [LABOR_CODE_SOURCE],
  en: {
    title: 'Retirement pay from your employer (RA 7641): who qualifies and how much',
    description: 'Who can get retirement pay under the Labor Code, how “½ month salary” per year of service is computed (22.5 days), and an example, from the law’s official text.',
    intro:
      'Besides your SSS pension, the Labor Code (Article 302, formerly 287, as amended by RA 7641) requires private employers to give retirement pay to qualified employees. Here is who qualifies and how much it is.',
    sections: [
      {
        heading: 'Who qualifies',
        points: [
          'You are at least 60 years old, and not older than 65 (the compulsory retirement age).',
          'You have served at least 5 years with the same employer.',
          'Your company has no retirement plan or agreement, or its plan gives less than the law.',
        ],
        note: 'Retail, service and agricultural businesses with not more than 10 employees are not covered.',
      },
      {
        heading: 'How much',
        text: 'At least ½ month salary for every year of service. A fraction of at least 6 months counts as one whole year.',
      },
      {
        heading: 'What “½ month salary” means',
        points: ['15 days’ salary,', 'plus 1/12 of your 13th month pay (2.5 days),', 'plus the cash equivalent of up to 5 days of service incentive leave.'],
        note: 'That is 22.5 days’ pay for every year of service, unless your employer agrees to include more.',
      },
      {
        heading: 'Example (daily rate of ₱700, 20 years and 8 months of service)',
        steps: ['Years counted: 21 (8 months is at least 6 months).', 'Pay per year: ₱700 × 22.5 = ₱15,750.', 'Retirement pay: ₱15,750 × 21 = ₱330,750.'],
      },
      {
        heading: 'Good to know',
        points: [
          'If your company has a retirement plan or union agreement, you get what it provides, but it cannot be less than what the law gives.',
          'This is separate from your SSS retirement pension.',
        ],
      },
    ],
  },
  fil: {
    title: 'Retirement pay mula sa employer (RA 7641): sino ang qualified at magkano',
    description: 'Sino ang makakatanggap ng retirement pay sa ilalim ng Labor Code, paano kinukuwenta ang “½ buwang sahod” kada taon ng serbisyo (22.5 araw), at halimbawa, mula sa opisyal na teksto ng batas.',
    intro:
      'Bukod sa SSS pension mo, hinihingi ng Labor Code (Artikulo 302, dating 287, na inamyendahan ng RA 7641) na magbigay ang mga pribadong employer ng retirement pay sa mga qualified na empleyado. Narito kung sino ang qualified at magkano.',
    sections: [
      {
        heading: 'Sino ang qualified',
        points: [
          'Hindi bababa sa 60 taong gulang, at hindi lalampas sa 65 (ang compulsory retirement age).',
          'Hindi bababa sa 5 taon ng serbisyo sa iisang employer.',
          'Walang retirement plan o kasunduan ang kompanya, o mas mababa ang ibinibigay ng plano kaysa sa batas.',
        ],
        note: 'Hindi sakop ang retail, service at agricultural na negosyong may hindi hihigit sa 10 empleyado.',
      },
      {
        heading: 'Magkano',
        text: 'Hindi bababa sa ½ buwang sahod kada taon ng serbisyo. Ang bahagi ng taon na hindi bababa sa 6 na buwan ay binibilang na isang buong taon.',
      },
      {
        heading: 'Ano ang ibig sabihin ng “½ buwang sahod”',
        points: ['15 araw na sahod,', 'dagdag ang 1/12 ng 13th month pay mo (2.5 araw),', 'dagdag ang cash na katumbas ng hanggang 5 araw ng service incentive leave.'],
        note: 'Katumbas ito ng 22.5 araw na sahod kada taon ng serbisyo, maliban kung pumayag ang employer na magsama ng higit pa.',
      },
      {
        heading: 'Halimbawa (daily rate na ₱700, 20 taon at 8 buwan ng serbisyo)',
        steps: ['Taong binilang: 21 (hindi bababa sa 6 na buwan ang 8 buwan).', 'Bayad kada taon: ₱700 × 22.5 = ₱15,750.', 'Retirement pay: ₱15,750 × 21 = ₱330,750.'],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Kung may retirement plan o union agreement ang kompanya mo, iyon ang matatanggap mo, pero hindi ito puwedeng mas mababa sa ibinibigay ng batas.',
          'Hiwalay ito sa SSS retirement pension mo.',
        ],
      },
    ],
  },
};
