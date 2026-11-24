import { HOLIDAY_PAY_CHECKED_ON, HOLIDAY_PAY_SOURCES } from '../holiday-pay.ts';
import type { Guide } from './types';

// From DOLE Labor Advisory No. 12, s. 2025 (2026 holiday pay rules) and Proclamation No. 1006, s. 2025.
export const holidayPayGuide: Guide = {
  slug: 'holiday-pay',
  category: 'holiday',
  checkedOn: HOLIDAY_PAY_CHECKED_ON,
  sources: HOLIDAY_PAY_SOURCES,
  en: {
    title: 'Holiday pay 2026: rates for regular holidays and special days (December guide)',
    description:
      'How much you should be paid on a 2026 regular holiday (200%) or special non-working day (130%), including rest days and overtime, plus December 2026’s holidays, from DOLE’s official advisory.',
    intro:
      'DOLE sets the pay rules for every holiday in 2026 in Labor Advisory No. 12, Series of 2025. The rate depends on the type of day: a regular holiday or a special (non-working) day. Here are the rules, with December 2026’s holidays.',
    sections: [
      {
        heading: 'December 2026 holidays',
        points: [
          'December 8 (Tuesday): Feast of the Immaculate Conception, special (non-working) day.',
          'December 24 (Thursday): Christmas Eve, special (non-working) day.',
          'December 25 (Friday): Christmas Day, regular holiday.',
          'December 30 (Wednesday): Rizal Day, regular holiday.',
          'December 31 (Thursday): Last Day of the Year, special (non-working) day.',
        ],
        note: 'November 30 (Bonifacio Day) is also a regular holiday. Dates are from Proclamation No. 1006, s. 2025.',
      },
      {
        heading: 'Regular holidays (December 25 and 30)',
        points: [
          'Did not work: 100% of your daily wage, if you reported to work or were on paid leave on the workday just before the holiday. If that day was a non-working day or your rest day, it counts if you worked or were on paid leave the day before it.',
          'Worked (first 8 hours): 200% of your daily wage.',
          'Overtime: your hourly rate × 200% × 130% for each hour beyond 8.',
          'Worked on a regular holiday that is also your rest day: 200% × 130% (260%) of your daily wage, and overtime at hourly rate × 200% × 130% × 130%.',
        ],
      },
      {
        heading: 'Special (non-working) days (December 8, 24 and 31)',
        points: [
          'Did not work: “no work, no pay”, unless your company policy, practice or union agreement gives pay for that day.',
          'Worked (first 8 hours): 130% of your daily wage.',
          'Overtime: your hourly rate × 130% × 130% for each hour beyond 8.',
          'Worked on a special day that is also your rest day: 150% of your daily wage, and overtime at hourly rate × 150% × 130%.',
        ],
      },
      {
        heading: 'Special (working) day',
        text: 'In 2026 this was February 25 (EDSA anniversary). It is treated as an ordinary working day: 100% of your wage for the first 8 hours, overtime at your hourly rate × 125%, and “no work, no pay” if you did not work.',
      },
      {
        heading: 'Examples (daily wage of ₱800, so ₱100 an hour)',
        points: [
          'Worked 8 hours on Christmas Day: ₱800 × 200% = ₱1,600.',
          'Worked 10 hours on Rizal Day: ₱1,600 + 2 hours × ₱100 × 200% × 130% = ₱2,120.',
          'Worked 8 hours on December 31: ₱800 × 130% = ₱1,040.',
          'Worked 8 hours on December 8 and it is your rest day: ₱800 × 150% = ₱1,200.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'These rules are for private-sector employees.',
          'Your company can pay more than these rates, but not less.',
          'If you were not paid correctly, you can raise it with DOLE through its official channels.',
        ],
      },
    ],
  },
  fil: {
    title: 'Holiday pay 2026: rates sa regular holiday at special day (gabay sa Disyembre)',
    description:
      'Magkano ang dapat na sahod mo sa regular holiday (200%) o special non-working day (130%) sa 2026, kasama ang rest day at overtime, at ang mga holiday sa Disyembre 2026, mula sa opisyal na advisory ng DOLE.',
    intro:
      'Itinakda ng DOLE ang patakaran sa sahod para sa bawat holiday sa 2026 sa Labor Advisory No. 12, Series of 2025. Nakadepende ang rate sa uri ng araw: regular holiday o special (non-working) day. Narito ang mga patakaran, kasama ang mga holiday sa Disyembre 2026.',
    sections: [
      {
        heading: 'Mga holiday sa Disyembre 2026',
        points: [
          'Disyembre 8 (Martes): Kapistahan ng Immaculada Concepcion, special (non-working) day.',
          'Disyembre 24 (Huwebes): Bisperas ng Pasko, special (non-working) day.',
          'Disyembre 25 (Biyernes): Araw ng Pasko, regular holiday.',
          'Disyembre 30 (Miyerkules): Araw ni Rizal, regular holiday.',
          'Disyembre 31 (Huwebes): Huling Araw ng Taon, special (non-working) day.',
        ],
        note: 'Regular holiday din ang Nobyembre 30 (Araw ni Bonifacio). Mula sa Proclamation No. 1006, s. 2025 ang mga petsa.',
      },
      {
        heading: 'Regular holiday (Disyembre 25 at 30)',
        points: [
          'Hindi nagtrabaho: 100% ng arawang sahod, kung pumasok ka o naka-paid leave sa araw ng trabaho bago ang holiday. Kung non-working day o rest day mo ang araw na iyon, binibilang ito kung pumasok ka o naka-paid leave sa araw bago nito.',
          'Nagtrabaho (unang 8 oras): 200% ng arawang sahod.',
          'Overtime: hourly rate × 200% × 130% sa bawat oras na lampas sa 8.',
          'Nagtrabaho sa regular holiday na rest day mo rin: 200% × 130% (260%) ng arawang sahod, at overtime na hourly rate × 200% × 130% × 130%.',
        ],
      },
      {
        heading: 'Special (non-working) day (Disyembre 8, 24 at 31)',
        points: [
          'Hindi nagtrabaho: “no work, no pay”, maliban kung may patakaran, kaugalian o union agreement ang kompanya mo na nagbibigay ng bayad sa araw na iyon.',
          'Nagtrabaho (unang 8 oras): 130% ng arawang sahod.',
          'Overtime: hourly rate × 130% × 130% sa bawat oras na lampas sa 8.',
          'Nagtrabaho sa special day na rest day mo rin: 150% ng arawang sahod, at overtime na hourly rate × 150% × 130%.',
        ],
      },
      {
        heading: 'Special (working) day',
        text: 'Sa 2026, ito ay Pebrero 25 (anibersaryo ng EDSA). Itinuturing itong ordinaryong araw ng trabaho: 100% ng sahod sa unang 8 oras, overtime na hourly rate × 125%, at “no work, no pay” kung hindi nagtrabaho.',
      },
      {
        heading: 'Mga halimbawa (arawang sahod na ₱800, o ₱100 kada oras)',
        points: [
          'Nagtrabaho nang 8 oras sa Pasko: ₱800 × 200% = ₱1,600.',
          'Nagtrabaho nang 10 oras sa Araw ni Rizal: ₱1,600 + 2 oras × ₱100 × 200% × 130% = ₱2,120.',
          'Nagtrabaho nang 8 oras sa Disyembre 31: ₱800 × 130% = ₱1,040.',
          'Nagtrabaho nang 8 oras sa Disyembre 8 na rest day mo: ₱800 × 150% = ₱1,200.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Para sa mga empleyado sa pribadong sektor ang mga patakarang ito.',
          'Puwedeng magbayad ang kompanya mo nang higit sa mga rate na ito, pero hindi kulang.',
          'Kung hindi ka nabayaran nang tama, puwede mo itong idulog sa DOLE sa mga opisyal nitong channel.',
        ],
      },
    ],
  },
};
