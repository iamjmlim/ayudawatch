import type { GuideSection } from './guides/types';
import type { Calculator } from './calculators';

// Explainers shown under each calculator: how the result is computed, worked examples and
// common questions. Every fact comes from the calculator's own `sources` (or the matching
// guide's), already checked against the official text; nothing here is new law.

export type Faq = { q: string; a: string };
export type CalcExplainer = { sections: GuideSection[]; faqs: Faq[] };

export const CALCULATOR_CONTENT: Partial<Record<Calculator['slug'], { en: CalcExplainer; fil: CalcExplainer }>> = {
  // From the DOLE Revised Guidelines on PD 851 and Labor Advisory No. 21, s. 2026 (the 13th month guide's
  // sources), plus the ₱90,000 exclusion in RA 10963 (TRAIN), Sec. 32(B)(7)(e).
  'thirteenth-month': {
    en: {
      sections: [
        {
          heading: 'How 13th month pay is computed',
          text: '13th month pay = the total basic salary you earned from January to December ÷ 12. Only basic pay you actually earned counts.',
          steps: [
            'Add up your basic pay for every month you worked this year.',
            'Divide the total by 12.',
            'That is the minimum your employer must pay by December 24, 2026. Your company can give more.',
          ],
        },
        {
          heading: 'Examples',
          points: [
            'Same pay all year: ₱18,000 a month × 12 months = ₱216,000 ÷ 12 = ₱18,000.',
            'Resigned at the end of September: ₱18,000 × 9 months = ₱162,000 ÷ 12 = ₱13,500.',
            'Got a raise mid-year: 6 months at ₱15,000 plus 6 months at ₱17,000 = ₱192,000 ÷ 12 = ₱16,000.',
            'Hired in October: ₱20,000 × 3 months = ₱60,000 ÷ 12 = ₱5,000.',
          ],
        },
        {
          heading: 'What counts as basic pay',
          points: [
            'Counted: what your employer pays you for the work you do.',
            'Not counted: overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA) and cash for unused leave, unless your contract, union agreement or company policy treats them as basic pay.',
            'Piece-rate workers and workers with a fixed wage plus commission compute it on their total earnings.',
          ],
        },
      ],
      faqs: [
        {
          q: 'When is the deadline for 13th month pay in 2026?',
          a: 'On or before December 24, 2026. Your employer may pay half before the school year opens and the rest by December 24. DOLE said no exemptions or deferments will be given to employers for 2026.',
        },
        {
          q: 'Is 13th month pay taxable?',
          a: 'Not up to ₱90,000. Under the TRAIN law, 13th month pay and other benefits such as bonuses are tax-free up to a combined ₱90,000 a year. Only the amount above ₱90,000 is taxed.',
        },
        {
          q: 'Do I get 13th month pay if I resigned or was terminated?',
          a: 'Yes. You get a pro-rated amount for the months you worked this year: your total basic pay from January (or your start date) until you left, divided by 12. You can ask for it when your employment ends.',
        },
        {
          q: 'Are overtime and holiday pay included?',
          a: 'No, unless your contract, union agreement or company policy counts them as part of your basic pay.',
        },
        {
          q: 'Who is entitled to 13th month pay?',
          a: 'All rank-and-file employees in the private sector who worked at least one month during the year, whatever their position, employment status or how they are paid. Managers who set policy or can hire and fire are not covered by this law.',
        },
        {
          q: 'Does a Christmas bonus count as 13th month pay?',
          a: 'It can. An employer that already gives a Christmas or mid-year bonus worth at least 1/12 of your basic pay is not required to pay a separate 13th month pay. If the bonus is less than that, the employer must pay the difference.',
        },
        {
          q: 'Are government employees covered?',
          a: 'No. This law covers the private sector. Government employees, including most government-owned and controlled corporations, are not covered by it.',
        },
        {
          q: 'Is 13th month pay used to compute SSS contributions?',
          a: 'No. It is separate from your regular wage and is not used to compute overtime, premium pay or SSS contributions.',
        },
        {
          q: 'What if my employer does not pay by December 24?',
          a: 'You can raise it with DOLE through its official channels.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang 13th month pay',
          text: '13th month pay = kabuuang basic salary na kinita mo mula Enero hanggang Disyembre ÷ 12. Ang basic pay lang na talagang kinita mo ang binibilang.',
          steps: [
            'Pagsamahin ang basic pay mo sa bawat buwang nagtrabaho ka ngayong taon.',
            'Hatiin ang kabuuan sa 12.',
            'Iyan ang pinakamababang dapat ibigay ng employer hanggang Disyembre 24, 2026. Puwedeng higit pa ang ibigay ng kompanya mo.',
          ],
        },
        {
          heading: 'Mga halimbawa',
          points: [
            'Pareho ang sahod buong taon: ₱18,000 kada buwan × 12 buwan = ₱216,000 ÷ 12 = ₱18,000.',
            'Nag-resign sa katapusan ng Setyembre: ₱18,000 × 9 na buwan = ₱162,000 ÷ 12 = ₱13,500.',
            'Nagka-umento sa kalagitnaan ng taon: 6 na buwan sa ₱15,000 at 6 na buwan sa ₱17,000 = ₱192,000 ÷ 12 = ₱16,000.',
            'Natanggap noong Oktubre: ₱20,000 × 3 buwan = ₱60,000 ÷ 12 = ₱5,000.',
          ],
        },
        {
          heading: 'Ano ang kasama sa basic pay',
          points: [
            'Kasama: ang ibinabayad sa iyo ng employer para sa trabahong ginagawa mo.',
            'Hindi kasama: overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA) at cash para sa hindi nagamit na leave, maliban kung itinuturing itong basic pay ng kontrata, union agreement o patakaran ng kompanya.',
            'Ang piece-rate worker at may fixed wage kasama ang commission ay kinukuwenta batay sa kabuuang kita.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Kailan ang deadline ng 13th month pay sa 2026?',
          a: 'Hanggang Disyembre 24, 2026. Puwedeng ibigay ng employer ang kalahati bago magbukas ang klase at ang natitira hanggang Disyembre 24. Sinabi ng DOLE na walang exemption o pagpapaliban na ibibigay sa mga employer para sa 2026.',
        },
        {
          q: 'May buwis ba ang 13th month pay?',
          a: 'Wala hanggang ₱90,000. Sa ilalim ng TRAIN law, walang buwis ang 13th month pay at iba pang benepisyo gaya ng bonus hanggang sa kabuuang ₱90,000 kada taon. Ang lampas lang sa ₱90,000 ang bubuwisan.',
        },
        {
          q: 'May 13th month pay ba kung nag-resign o natanggal ako?',
          a: 'Oo. Makakatanggap ka ng pro-rated na halaga para sa mga buwang nagtrabaho ka ngayong taon: kabuuang basic pay mula Enero (o simula ng trabaho mo) hanggang umalis ka, hinati sa 12. Puwede mo itong hingin pagkatapos ng trabaho mo.',
        },
        {
          q: 'Kasama ba ang overtime at holiday pay?',
          a: 'Hindi, maliban kung itinuturing itong bahagi ng basic pay ng kontrata, union agreement o patakaran ng kompanya mo.',
        },
        {
          q: 'Sino ang may karapatan sa 13th month pay?',
          a: 'Lahat ng rank-and-file na empleyado sa pribadong sektor na nagtrabaho nang kahit isang buwan sa loob ng taon, anuman ang posisyon, employment status o paraan ng pagbabayad. Hindi sakop ng batas na ito ang mga manager na gumagawa ng patakaran o may kapangyarihang mag-hire at magtanggal.',
        },
        {
          q: 'Puwede bang ituring na 13th month pay ang Christmas bonus?',
          a: 'Puwede. Hindi na kailangang magbigay ng hiwalay na 13th month pay ang employer na nagbibigay na ng Christmas o mid-year bonus na hindi bababa sa 1/12 ng basic pay mo. Kung mas mababa rito, kailangang bayaran ng employer ang kulang.',
        },
        {
          q: 'Sakop ba ang mga empleyado ng gobyerno?',
          a: 'Hindi. Para sa pribadong sektor ang batas na ito. Hindi ito sakop ang mga empleyado ng gobyerno, kasama ang karamihan ng government-owned and controlled corporation.',
        },
        {
          q: 'Ginagamit ba ang 13th month pay sa pagkuwenta ng SSS contribution?',
          a: 'Hindi. Hiwalay ito sa regular na sahod at hindi ginagamit sa pagkuwenta ng overtime, premium pay o SSS contribution.',
        },
        {
          q: 'Paano kung hindi ako nabayaran hanggang Disyembre 24?',
          a: 'Puwede mo itong idulog sa DOLE sa mga opisyal nitong channel.',
        },
      ],
    },
  },

  // From DOLE Labor Advisory No. 12, s. 2025 and No. 17, s. 2026 (pay rules unchanged for 2027),
  // Proclamations No. 1006 and 1427, and Labor Code Art. 94 (small retail and service establishments).
  'holiday-pay': {
    en: {
      sections: [
        {
          heading: 'Holiday pay rates (first 8 hours)',
          points: [
            'Regular holiday, worked: 200% of your daily wage.',
            'Regular holiday, not worked: 100%, if you reported to work or were on paid leave on the workday before.',
            'Regular holiday that is also your rest day, worked: 260% (200% × 130%).',
            'Special (non-working) day, worked: 130%.',
            'Special (non-working) day, not worked: “no work, no pay”, unless company policy, practice or a union agreement says otherwise.',
            'Special day that is also your rest day, worked: 150%.',
            'Special (working) day: an ordinary workday, 100%.',
          ],
        },
        {
          heading: 'Overtime on a holiday',
          text: 'Each hour beyond 8 is paid at the holiday’s hourly rate plus 30%: hourly rate × 200% × 130% on a regular holiday, and hourly rate × 130% × 130% on a special day.',
        },
        {
          heading: 'Examples (daily wage ₱800, so ₱100 an hour)',
          points: [
            'Worked 8 hours on Christmas Day: ₱800 × 200% = ₱1,600.',
            'Worked 10 hours on Rizal Day: ₱1,600 + 2 hours × ₱100 × 200% × 130% = ₱2,120.',
            'Worked 8 hours on December 31: ₱800 × 130% = ₱1,040.',
            'Worked 8 hours on December 8, which is your rest day: ₱800 × 150% = ₱1,200.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Do I get paid on a regular holiday if I do not work?',
          a: 'Yes, 100% of your daily wage, as long as you reported to work or were on paid leave on the workday just before the holiday.',
        },
        {
          q: 'Do I get paid on a special non-working day if I do not work?',
          a: 'Not by law. The rule is “no work, no pay”, unless your company policy, practice or union agreement gives pay for that day.',
        },
        {
          q: 'Are December 24 and 31 holidays?',
          a: 'Yes. In both 2026 and 2027, Christmas Eve (December 24) and the Last Day of the Year (December 31) are special (non-working) days. Christmas Day (December 25) and Rizal Day (December 30) are regular holidays.',
        },
        {
          q: 'Did the holiday pay rules change for 2027?',
          a: 'No. DOLE’s advisory for 2027 keeps the same rates: 200% for working on a regular holiday and 130% for a special day, with higher rates on rest days and for overtime.',
        },
        {
          q: 'Does holiday pay apply to every worker?',
          a: 'These rules are for private-sector employees. Under the Labor Code, retail and service establishments regularly employing fewer than ten workers are exempt from regular holiday pay.',
        },
        {
          q: 'Can my company pay more than these rates?',
          a: 'Yes. These are minimums. Your company can pay more, but not less.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Rate ng holiday pay (unang 8 oras)',
          points: [
            'Regular holiday, nagtrabaho: 200% ng arawang sahod.',
            'Regular holiday, hindi nagtrabaho: 100%, kung pumasok ka o naka-paid leave sa araw ng trabaho bago nito.',
            'Regular holiday na rest day mo rin, nagtrabaho: 260% (200% × 130%).',
            'Special (non-working) day, nagtrabaho: 130%.',
            'Special (non-working) day, hindi nagtrabaho: “no work, no pay”, maliban kung iba ang patakaran, kaugalian o union agreement ng kompanya.',
            'Special day na rest day mo rin, nagtrabaho: 150%.',
            'Special (working) day: ordinaryong araw ng trabaho, 100%.',
          ],
        },
        {
          heading: 'Overtime sa holiday',
          text: 'Ang bawat oras na lampas sa 8 ay binabayaran sa hourly rate ng holiday dagdag ang 30%: hourly rate × 200% × 130% sa regular holiday, at hourly rate × 130% × 130% sa special day.',
        },
        {
          heading: 'Mga halimbawa (arawang sahod ₱800, o ₱100 kada oras)',
          points: [
            'Nagtrabaho nang 8 oras sa Pasko: ₱800 × 200% = ₱1,600.',
            'Nagtrabaho nang 10 oras sa Araw ni Rizal: ₱1,600 + 2 oras × ₱100 × 200% × 130% = ₱2,120.',
            'Nagtrabaho nang 8 oras sa Disyembre 31: ₱800 × 130% = ₱1,040.',
            'Nagtrabaho nang 8 oras sa Disyembre 8 na rest day mo: ₱800 × 150% = ₱1,200.',
          ],
        },
      ],
      faqs: [
        {
          q: 'May bayad ba ako sa regular holiday kahit hindi ako nagtrabaho?',
          a: 'Oo, 100% ng arawang sahod mo, basta pumasok ka o naka-paid leave sa araw ng trabaho bago ang holiday.',
        },
        {
          q: 'May bayad ba ako sa special non-working day kung hindi ako nagtrabaho?',
          a: 'Wala sa batas. “No work, no pay” ang patakaran, maliban kung may patakaran, kaugalian o union agreement ang kompanya mo na nagbibigay ng bayad.',
        },
        {
          q: 'Holiday ba ang Disyembre 24 at 31?',
          a: 'Oo. Sa 2026 at 2027, special (non-working) day ang Bisperas ng Pasko (Disyembre 24) at Huling Araw ng Taon (Disyembre 31). Regular holiday ang Pasko (Disyembre 25) at Araw ni Rizal (Disyembre 30).',
        },
        {
          q: 'Nagbago ba ang patakaran sa holiday pay para sa 2027?',
          a: 'Hindi. Pareho ang rate sa advisory ng DOLE para sa 2027: 200% sa pagtatrabaho sa regular holiday at 130% sa special day, at mas mataas sa rest day at overtime.',
        },
        {
          q: 'Para sa lahat ba ng manggagawa ang holiday pay?',
          a: 'Para sa mga empleyado sa pribadong sektor ang mga patakarang ito. Sa Labor Code, exempted sa regular holiday pay ang mga retail at service establishment na regular na may mas kaunti sa sampung manggagawa.',
        },
        {
          q: 'Puwede bang magbayad nang mas mataas ang kompanya?',
          a: 'Oo. Pinakamababa lang ang mga ito. Puwedeng magbayad nang higit ang kompanya, pero hindi kulang.',
        },
      ],
    },
  },

  // From RA 10963 (TRAIN) Sec. 24(A)(2) and 32(B)(7)(e), RA 8424 Sec. 32(B)(7)(f), and the official
  // SSS, PhilHealth and Pag-IBIG schedules in lib/contributions.ts.
  'take-home-pay': {
    en: {
      sections: [
        {
          heading: 'How take-home pay is computed',
          steps: [
            'Start with your monthly gross pay (basic pay plus taxable allowances).',
            'Subtract your share of SSS, PhilHealth and Pag-IBIG. These are not taxed.',
            'Compute the income tax on what is left, using the TRAIN law table (yearly amount ÷ 12).',
            'Take-home pay = gross pay − contributions − withholding tax (+ any non-taxable allowances).',
          ],
        },
        {
          heading: 'Income tax table (2023 onwards, per year)',
          points: [
            '₱250,000 and below: no tax.',
            'Over ₱250,000 to ₱400,000: 15% of the amount over ₱250,000.',
            'Over ₱400,000 to ₱800,000: ₱22,500 + 20% of the amount over ₱400,000.',
            'Over ₱800,000 to ₱2,000,000: ₱102,500 + 25% of the amount over ₱800,000.',
            'Over ₱2,000,000 to ₱8,000,000: ₱402,500 + 30% of the amount over ₱2,000,000.',
            'Over ₱8,000,000: ₱2,202,500 + 35% of the amount over ₱8,000,000.',
          ],
        },
        {
          heading: 'Example: ₱25,000 monthly basic pay',
          points: [
            'SSS ₱1,250, PhilHealth ₱625, Pag-IBIG ₱200: ₱2,075 in contributions.',
            'Taxable pay: ₱25,000 − ₱2,075 = ₱22,925 a month, or ₱275,100 a year.',
            'Tax: 15% × (₱275,100 − ₱250,000) = ₱3,765 a year, or ₱313.75 a month.',
            'Take-home pay: ₱25,000 − ₱2,075 − ₱313.75 = ₱22,611.25 a month.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much salary is tax-free in the Philippines?',
          a: 'Taxable income of ₱250,000 a year or less has no income tax. That is about ₱20,833 a month of taxable pay, counted after SSS, PhilHealth and Pag-IBIG are deducted.',
        },
        {
          q: 'Are minimum wage earners taxed?',
          a: 'No. Minimum wage earners are exempt from income tax on their minimum wage, and their holiday pay is also exempt.',
        },
        {
          q: 'Are SSS, PhilHealth and Pag-IBIG contributions taxed?',
          a: 'No. Your share of GSIS, SSS, PhilHealth and Pag-IBIG contributions, and union dues, are excluded from taxable income.',
        },
        {
          q: 'Is 13th month pay taxed?',
          a: 'Not up to ₱90,000. 13th month pay and other benefits like bonuses are tax-free up to a combined ₱90,000 a year; only the excess is taxed.',
        },
        {
          q: 'Why is my payslip different from this calculator?',
          a: 'Payslips can include loans, absences, other deductions or a different payroll method. This calculator gives an estimate based on the official tax table and contribution schedules.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang take-home pay',
          steps: [
            'Magsimula sa buwanang gross pay (basic pay at taxable na allowance).',
            'Ibawas ang bahagi mo sa SSS, PhilHealth at Pag-IBIG. Walang buwis ang mga ito.',
            'Kuwentahin ang income tax sa natitira, gamit ang tax table ng TRAIN law (taunang halaga ÷ 12).',
            'Take-home pay = gross pay − kontribusyon − withholding tax (+ anumang non-taxable na allowance).',
          ],
        },
        {
          heading: 'Income tax table (mula 2023, kada taon)',
          points: [
            '₱250,000 pababa: walang buwis.',
            'Lampas ₱250,000 hanggang ₱400,000: 15% ng lampas sa ₱250,000.',
            'Lampas ₱400,000 hanggang ₱800,000: ₱22,500 + 20% ng lampas sa ₱400,000.',
            'Lampas ₱800,000 hanggang ₱2,000,000: ₱102,500 + 25% ng lampas sa ₱800,000.',
            'Lampas ₱2,000,000 hanggang ₱8,000,000: ₱402,500 + 30% ng lampas sa ₱2,000,000.',
            'Lampas ₱8,000,000: ₱2,202,500 + 35% ng lampas sa ₱8,000,000.',
          ],
        },
        {
          heading: 'Halimbawa: ₱25,000 na buwanang basic pay',
          points: [
            'SSS ₱1,250, PhilHealth ₱625, Pag-IBIG ₱200: ₱2,075 na kontribusyon.',
            'Taxable na sahod: ₱25,000 − ₱2,075 = ₱22,925 kada buwan, o ₱275,100 kada taon.',
            'Buwis: 15% × (₱275,100 − ₱250,000) = ₱3,765 kada taon, o ₱313.75 kada buwan.',
            'Take-home pay: ₱25,000 − ₱2,075 − ₱313.75 = ₱22,611.25 kada buwan.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Magkanong sahod ang walang buwis sa Pilipinas?',
          a: 'Walang income tax ang taxable income na ₱250,000 pababa kada taon. Mga ₱20,833 kada buwan iyon na taxable na sahod, binibilang pagkatapos ibawas ang SSS, PhilHealth at Pag-IBIG.',
        },
        {
          q: 'May buwis ba ang minimum wage earner?',
          a: 'Wala. Exempted sa income tax ang minimum wage earner sa kanilang minimum wage, at wala ring buwis ang kanilang holiday pay.',
        },
        {
          q: 'May buwis ba ang kontribusyon sa SSS, PhilHealth at Pag-IBIG?',
          a: 'Wala. Hindi kasama sa taxable income ang bahagi mo sa kontribusyon sa GSIS, SSS, PhilHealth at Pag-IBIG, at ang union dues.',
        },
        {
          q: 'May buwis ba ang 13th month pay?',
          a: 'Wala hanggang ₱90,000. Walang buwis ang 13th month pay at iba pang benepisyo gaya ng bonus hanggang sa kabuuang ₱90,000 kada taon; ang lampas lang ang bubuwisan.',
        },
        {
          q: 'Bakit iba ang nasa payslip ko kaysa sa calculator na ito?',
          a: 'Puwedeng may loan, absent, iba pang kaltas o ibang paraan ng payroll sa payslip mo. Tantiya ang ibinibigay ng calculator na ito batay sa opisyal na tax table at contribution schedule.',
        },
      ],
    },
  },
};
