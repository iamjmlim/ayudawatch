import type { Locale } from './i18n';

// Key facts shown on Facebook / Messenger share cards. Every number comes from the page it belongs to
// (calculator explainers in lib/calculator-content*.ts and the guides in lib/guides/), already checked
// against the official sources. `big` is the headline number; `facts` are up to 3 short lines.

export type Highlight = { big?: { value: string; label: string }; facts: string[] };
type ByLocale = Record<Locale, Highlight>;

export const CALCULATOR_HIGHLIGHTS: Record<string, ByLocale> = {
  'thirteenth-month': {
    en: { big: { value: '÷ 12', label: 'total basic pay, January–December' }, facts: ['Tax-free up to ₱90,000', 'Pro-rated even if you resigned', 'Deadline: December 24'] },
    fil: { big: { value: '÷ 12', label: 'kabuuang basic pay, Enero–Disyembre' }, facts: ['Walang tax hanggang ₱90,000', 'May pro-rated kahit nag-resign', 'Deadline: Disyembre 24'] },
  },
  'holiday-pay': {
    en: { big: { value: '200%', label: 'working on a regular holiday' }, facts: ['Special day worked: 130%', 'Regular holiday + rest day: 260%', 'Not worked, regular holiday: 100%'] },
    fil: { big: { value: '200%', label: 'pagtatrabaho sa regular holiday' }, facts: ['Special day, nagtrabaho: 130%', 'Regular holiday + rest day: 260%', 'Hindi nagtrabaho, regular holiday: 100%'] },
  },
  'take-home-pay': {
    en: { big: { value: '₱22,611', label: 'take-home on a ₱25,000 salary' }, facts: ['Minus SSS, PhilHealth, Pag-IBIG', 'TRAIN law tax table', 'No tax on ₱250,000 a year or less'] },
    fil: { big: { value: '₱22,611', label: 'take-home sa ₱25,000 na sahod' }, facts: ['Bawas SSS, PhilHealth, Pag-IBIG', 'Tax table ng TRAIN law', 'Walang tax sa ₱250,000 pababa kada taon'] },
  },
  contributions: {
    en: { big: { value: '₱2,075', label: 'employee share on a ₱25,000 salary' }, facts: ['SSS 15% of salary credit', 'PhilHealth 5%, shared equally', 'Pag-IBIG up to ₱200 each'] },
    fil: { big: { value: '₱2,075', label: 'bahagi ng empleyado sa ₱25,000 na sahod' }, facts: ['SSS 15% ng salary credit', 'PhilHealth 5%, hati ng empleyado at employer', 'Pag-IBIG hanggang ₱200 bawat isa'] },
  },
  'pagibig-mp2': {
    en: { big: { value: '7.12%', label: 'MP2 dividend rate for 2025' }, facts: ['₱500 a month → about ₱35,921 in 5 years', 'Dividends are tax-free', 'Minimum ₱500 per remittance'] },
    fil: { big: { value: '7.12%', label: 'MP2 dividend rate sa 2025' }, facts: ['₱500 kada buwan → mga ₱35,921 sa 5 taon', 'Walang tax ang dibidendo', '₱500 ang pinakamababang hulog'] },
  },
  'sss-pension': {
    en: { big: { value: '120', label: 'monthly contributions for a pension' }, facts: ['Retire at 60, or 65 while working', 'Pensions up 10% in 2025 and 2026', '₱1,000 additional benefit a month'] },
    fil: { big: { value: '120', label: 'buwanang hulog para sa pension' }, facts: ['Magretiro sa 60, o 65 kahit nagtatrabaho', 'Tumaas nang 10% noong 2025 at 2026', '₱1,000 na dagdag kada buwan'] },
  },
  'sss-maternity': {
    en: { big: { value: '₱70,000', label: 'maximum for a live birth (105 days)' }, facts: ['₱80,000 for solo parents (120 days)', '₱40,000 for miscarriage (60 days)', 'Just 3 contributions in 12 months'] },
    fil: { big: { value: '₱70,000', label: 'pinakamataas sa live birth (105 araw)' }, facts: ['₱80,000 sa solo parent (120 araw)', '₱40,000 sa miscarriage (60 araw)', 'Kahit 3 hulog lang sa 12 buwan'] },
  },
  'sss-sickness': {
    en: { big: { value: '₱600', label: 'maximum a day (90% of daily salary credit)' }, facts: ['At least 4 days confined', 'Up to 120 days a year', '3 contributions in 12 months'] },
    fil: { big: { value: '₱600', label: 'pinakamataas kada araw (90% ng daily salary credit)' }, facts: ['Hindi bababa sa 4 na araw na naka-confine', 'Hanggang 120 araw kada taon', '3 hulog sa 12 buwan'] },
  },
  'overtime-pay': {
    en: { big: { value: '+25%', label: 'per overtime hour on an ordinary day' }, facts: ['Rest day: +30%', 'Night shift (10 PM–6 AM): +10%', '₱800 a day, 10 hours → ₱1,050'] },
    fil: { big: { value: '+25%', label: 'kada oras ng overtime sa ordinaryong araw' }, facts: ['Rest day: +30%', 'Night shift (10 PM–6 AM): +10%', '₱800 kada araw, 10 oras → ₱1,050'] },
  },
  'separation-pay': {
    en: { big: { value: '1 month', label: 'per year of service (redundancy)' }, facts: ['½ month a year: retrenchment, closure, illness', 'Minimum is always 1 month’s pay', 'None by law if you resigned'] },
    fil: { big: { value: '1 buwan', label: 'kada taon ng serbisyo (redundancy)' }, facts: ['½ buwan kada taon: retrenchment, pagsasara, sakit', 'Laging hindi bababa sa 1 buwang sahod', 'Wala sa batas kung nag-resign'] },
  },
  'retirement-pay': {
    en: { big: { value: '22.5 days', label: 'pay per year of service (RA 7641)' }, facts: ['Age 60 to 65', 'At least 5 years with the employer', 'Separate from your SSS pension'] },
    fil: { big: { value: '22.5 araw', label: 'na sahod kada taon ng serbisyo (RA 7641)' }, facts: ['Edad 60 hanggang 65', 'Hindi bababa sa 5 taon sa employer', 'Hiwalay sa SSS pension mo'] },
  },
};

// Contribution tables (lib/contributions.ts, official SSS, PhilHealth and Pag-IBIG schedules).
export const TABLE_HIGHLIGHTS: Record<string, ByLocale> = {
  'sss-contribution-table': {
    en: { big: { value: '15%', label: 'of your monthly salary credit' }, facts: ['Employee 5%, employer 10%', 'Salary credit ₱5,000 to ₱35,000', 'Schedule effective January 2025'] },
    fil: { big: { value: '15%', label: 'ng monthly salary credit mo' }, facts: ['Empleyado 5%, employer 10%', 'Salary credit ₱5,000 hanggang ₱35,000', 'Schedule mula Enero 2025'] },
  },
  'philhealth-contribution-table': {
    en: { big: { value: '5%', label: 'of monthly basic salary' }, facts: ['Shared equally with your employer', 'Floor ₱10,000, ceiling ₱100,000', 'Employee pays ₱250 to ₱2,500'] },
    fil: { big: { value: '5%', label: 'ng buwanang basic salary' }, facts: ['Hati kayo ng employer mo', '₱10,000 pinakamababa, ₱100,000 pinakamataas', '₱250 hanggang ₱2,500 ang bahagi mo'] },
  },
  'pagibig-contribution-table': {
    en: { big: { value: '₱200', label: 'most an employee pays a month' }, facts: ['2% from you, 2% from your employer', 'On up to ₱10,000 of salary', 'You can always save more'] },
    fil: { big: { value: '₱200', label: 'pinakamalaking hulog ng empleyado kada buwan' }, facts: ['2% mula sa iyo, 2% mula sa employer', 'Sa hanggang ₱10,000 na sahod', 'Puwede laging mag-ipon nang higit pa'] },
  },
};

export const GUIDE_HIGHLIGHTS: Record<string, ByLocale> = {
  'thirteenth-month-pay': CALCULATOR_HIGHLIGHTS['thirteenth-month'],
  'holiday-pay': CALCULATOR_HIGHLIGHTS['holiday-pay'],
  'pagibig-mp2': CALCULATOR_HIGHLIGHTS['pagibig-mp2'],
  'separation-pay': CALCULATOR_HIGHLIGHTS['separation-pay'],
  'retirement-pay': CALCULATOR_HIGHLIGHTS['retirement-pay'],
  'sss-maternity-benefit': CALCULATOR_HIGHLIGHTS['sss-maternity'],
  'sss-sickness-benefit': CALCULATOR_HIGHLIGHTS['sss-sickness'],
  'sss-retirement-benefit': CALCULATOR_HIGHLIGHTS['sss-pension'],
  'sss-salary-loan': {
    en: { big: { value: '36', label: 'contributions for a one-month loan' }, facts: ['8% a year on the diminishing balance', '1% service fee', 'Apply online in My.SSS'] },
    fil: { big: { value: '36', label: 'hulog para sa one-month loan' }, facts: ['8% kada taon sa lumiliit na balanse', '1% na service fee', 'Mag-apply online sa My.SSS'] },
  },
  'sss-calamity-loan': {
    en: { big: { value: '7%', label: 'interest a year, 24 monthly payments' }, facts: ['For areas under a state of calamity', '36 contributions, 6 in the last 12 months', '1% service fee'] },
    fil: { big: { value: '7%', label: 'interes kada taon, 24 na buwanang hulog' }, facts: ['Para sa lugar na may state of calamity', '36 na hulog, 6 sa huling 12 buwan', '1% na service fee'] },
  },
  'sss-funeral-benefit': {
    en: { big: { value: '₱60,000', label: 'maximum funeral benefit' }, facts: ['₱20,000 to ₱60,000 with 36+ contributions', '₱12,000 with fewer than 36', 'Can be filed online'] },
    fil: { big: { value: '₱60,000', label: 'pinakamataas na funeral benefit' }, facts: ['₱20,000 hanggang ₱60,000 kung 36+ hulog', '₱12,000 kung kulang sa 36', 'Puwedeng mag-file online'] },
  },
  'sss-death-benefit': {
    en: { big: { value: '36', label: 'contributions for a lifetime pension' }, facts: ['Fewer than 36: lump sum', 'For the spouse and dependent children', '₱1,000 additional benefit a month'] },
    fil: { big: { value: '36', label: 'hulog para sa habambuhay na pension' }, facts: ['Kulang sa 36: lump sum', 'Para sa asawa at mga dependent na anak', '₱1,000 na dagdag kada buwan'] },
  },
  'sss-disability-benefit': {
    en: { big: { value: '36', label: 'contributions for a monthly pension' }, facts: ['Fewer than 36: lump sum', 'Minimum pension ₱1,000 to ₱2,400', '₱1,000 + ₱500 extra a month'] },
    fil: { big: { value: '36', label: 'hulog para sa buwanang pension' }, facts: ['Kulang sa 36: lump sum', 'Pinakamababang pension ₱1,000 hanggang ₱2,400', '₱1,000 + ₱500 na dagdag kada buwan'] },
  },
  'sss-unemployment-benefit': {
    en: { big: { value: '36', label: 'contributions, 12 in the last 18 months' }, facts: ['Involuntary job loss, age 60 or below', 'File within 1 year', 'Once every 3 years'] },
    fil: { big: { value: '36', label: 'hulog, 12 sa huling 18 buwan' }, facts: ['Nawalan ng trabaho nang hindi kusa, edad 60 pababa', 'Mag-file sa loob ng 1 taon', 'Isang beses kada 3 taon'] },
  },
  'sss-voluntary-member': {
    en: { big: { value: '₱750', label: 'a month at the ₱5,000 minimum salary credit' }, facts: ['No form needed: pick it when paying', 'Choose your own salary credit', 'Missed months can’t be paid later'] },
    fil: { big: { value: '₱750', label: 'kada buwan sa ₱5,000 na minimum salary credit' }, facts: ['Walang form: piliin sa pagbabayad', 'Pumili ng sariling salary credit', 'Hindi na mababayaran ang lumaktaw na buwan'] },
  },
  'philhealth-senior-citizens': {
    en: { big: { value: '60+', label: 'Filipinos covered by PhilHealth' }, facts: ['Premiums paid from the Sin Tax Law', 'Register through OSCA or PhilHealth', 'Benefits deducted from your bill'] },
    fil: { big: { value: '60+', label: 'na Pilipinong sakop ng PhilHealth' }, facts: ['Bayad ang premium mula sa Sin Tax Law', 'Magparehistro sa OSCA o PhilHealth', 'Ibinabawas ang benepisyo sa bill'] },
  },
};
