import type { CalcExplainer } from './calculator-content';

// Explainers for the Labor Code calculators. Facts from the Labor Code (PD 442, as amended) on LawPhil:
// Arts. 86, 87, 93 (overtime, night shift, rest day), 283–284 (separation pay, now 298–299) and
// 287 as amended by RA 7641 (retirement pay, now 302). Examples are computed with lib/labor.ts.

export const LABOR_CONTENT: Record<'overtime-pay' | 'separation-pay' | 'retirement-pay', { en: CalcExplainer; fil: CalcExplainer }> = {
  'overtime-pay': {
    en: {
      sections: [
        {
          heading: 'How overtime and night differential are computed',
          steps: [
            'Hourly rate = your daily wage ÷ 8.',
            'Overtime on an ordinary day: each hour beyond 8 is paid at the hourly rate × 125%.',
            'Work on your scheduled rest day: the first 8 hours at 130%, and each overtime hour at 130% × 130% (169%).',
            'Night shift differential: at least 10% of the hourly rate for each hour worked between 10 PM and 6 AM.',
          ],
        },
        {
          heading: 'Examples (daily wage ₱800, so ₱100 an hour)',
          points: [
            '10 hours on an ordinary day: ₱800 + 2 × ₱125 = ₱1,050.',
            '8-hour night shift, 10 PM to 6 AM: ₱800 + 8 × ₱10 = ₱880.',
            '10 hours on your rest day: ₱800 × 130% = ₱1,040, plus 2 × ₱169 = ₱338, for ₱1,378.',
          ],
          note: 'For work on a regular holiday or special day, use the holiday pay calculator: holidays have their own rates.',
        },
      ],
      faqs: [
        {
          q: 'How much is overtime pay in the Philippines?',
          a: 'At least 25% more than your regular hourly rate for each hour beyond 8 hours a day. On a rest day or holiday, overtime is the rate for that day plus at least 30%.',
        },
        {
          q: 'What hours count for night differential?',
          a: 'Every hour worked between 10 PM and 6 AM earns at least 10% of your regular wage for that hour, whether or not it is overtime.',
        },
        {
          q: 'How much is rest day pay?',
          a: 'At least 30% more than your regular wage if you are made or allowed to work on your scheduled rest day. Sunday counts only if it is your established rest day.',
        },
        {
          q: 'Can undertime be offset by overtime?',
          a: 'No. Undertime on one day cannot be offset by overtime on another day, and giving you leave on another day does not excuse the employer from paying overtime.',
        },
        {
          q: 'Can my company pay a higher premium?',
          a: 'Yes. If your union agreement or contract sets a higher premium than the law, your employer must pay the higher rate.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang overtime at night differential',
          steps: [
            'Hourly rate = arawang sahod ÷ 8.',
            'Overtime sa ordinaryong araw: ang bawat oras na lampas sa 8 ay binabayaran sa hourly rate × 125%.',
            'Trabaho sa rest day: ang unang 8 oras ay 130%, at ang bawat oras ng overtime ay 130% × 130% (169%).',
            'Night shift differential: hindi bababa sa 10% ng hourly rate sa bawat oras ng trabaho mula 10 PM hanggang 6 AM.',
          ],
        },
        {
          heading: 'Mga halimbawa (arawang sahod ₱800, o ₱100 kada oras)',
          points: [
            '10 oras sa ordinaryong araw: ₱800 + 2 × ₱125 = ₱1,050.',
            '8 oras na night shift, 10 PM hanggang 6 AM: ₱800 + 8 × ₱10 = ₱880.',
            '10 oras sa rest day mo: ₱800 × 130% = ₱1,040, dagdag ang 2 × ₱169 = ₱338, kaya ₱1,378.',
          ],
          note: 'Para sa trabaho sa regular holiday o special day, gamitin ang holiday pay calculator: may sariling rate ang mga holiday.',
        },
      ],
      faqs: [
        {
          q: 'Magkano ang overtime pay sa Pilipinas?',
          a: 'Hindi bababa sa 25% na dagdag sa regular na hourly rate sa bawat oras na lampas sa 8 oras kada araw. Sa rest day o holiday, ang overtime ay ang rate ng araw na iyon dagdag ang hindi bababa sa 30%.',
        },
        {
          q: 'Anong oras ang may night differential?',
          a: 'Ang bawat oras ng trabaho mula 10 PM hanggang 6 AM ay may hindi bababa sa 10% ng regular na sahod para sa oras na iyon, overtime man o hindi.',
        },
        {
          q: 'Magkano ang bayad sa rest day?',
          a: 'Hindi bababa sa 30% na dagdag sa regular na sahod kung pinagtrabaho ka o pinayagang magtrabaho sa rest day mo. Binibilang lang ang Linggo kung iyon ang itinakdang rest day mo.',
        },
        {
          q: 'Puwede bang ipambawi ang overtime sa undertime?',
          a: 'Hindi. Hindi puwedeng ipambawi ang overtime sa isang araw sa undertime sa ibang araw, at hindi rin dahilan ang pagbibigay ng leave sa ibang araw para hindi magbayad ng overtime.',
        },
        {
          q: 'Puwede bang mas mataas ang premium na ibayad ng kompanya?',
          a: 'Oo. Kung mas mataas ang premium sa union agreement o kontrata kaysa sa batas, ang mas mataas ang dapat bayaran ng employer.',
        },
      ],
    },
  },

  'separation-pay': {
    en: {
      sections: [
        {
          heading: 'How separation pay is computed',
          steps: [
            'Count your years of service. A fraction of at least 6 months counts as a whole year.',
            'Redundancy or labor-saving devices: 1 month’s pay × years of service.',
            'Retrenchment, closure not due to serious losses, or illness: ½ month’s pay × years of service.',
            'Compare with 1 month’s pay. You get whichever is higher.',
          ],
        },
        {
          heading: 'Examples (monthly pay ₱20,000)',
          points: [
            'Redundancy after 4 years and 7 months (counted as 5 years): 5 × ₱20,000 = ₱100,000.',
            'Retrenchment after 4 years and 7 months: 5 × ₱10,000 = ₱50,000.',
            'Retrenchment after 1 year: ½ month (₱10,000) is less than 1 month’s pay, so you get ₱20,000.',
            'Illness after 4 years and 5 months (counted as 4 years): 4 × ₱10,000 = ₱40,000.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Do I get separation pay if I resign?',
          a: 'Not under the Labor Code. Separation pay is not required when you resign or are dismissed for a just cause, unless your contract, company policy or union agreement gives it.',
        },
        {
          q: 'Who gets 1 month per year of service?',
          a: 'Employees whose jobs end because of redundancy or the installation of labor-saving devices.',
        },
        {
          q: 'Who gets ½ month per year of service?',
          a: 'Employees let go through retrenchment to prevent losses, a closure not due to serious business losses, or because of an illness the law prohibits or that harms their health or co-workers’ health. The minimum is always 1 month’s pay.',
        },
        {
          q: 'Is there separation pay if the company closed because of losses?',
          a: 'Not under the Labor Code, if the closure was due to serious business losses or financial reverses. A contract or company policy may still give it.',
        },
        {
          q: 'How much notice must the employer give?',
          a: 'For redundancy, labor-saving devices, retrenchment or closure, the employer must give written notice to you and to DOLE at least 1 month before the termination date.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang separation pay',
          steps: [
            'Bilangin ang taon ng serbisyo. Ang bahagi ng taon na hindi bababa sa 6 na buwan ay buong taon.',
            'Redundancy o labor-saving devices: 1 buwang sahod × taon ng serbisyo.',
            'Retrenchment, pagsasara na hindi dahil sa malaking pagkalugi, o sakit: ½ buwang sahod × taon ng serbisyo.',
            'Ihambing sa 1 buwang sahod. Ang mas mataas ang matatanggap mo.',
          ],
        },
        {
          heading: 'Mga halimbawa (buwanang sahod ₱20,000)',
          points: [
            'Redundancy pagkatapos ng 4 na taon at 7 buwan (binilang na 5 taon): 5 × ₱20,000 = ₱100,000.',
            'Retrenchment pagkatapos ng 4 na taon at 7 buwan: 5 × ₱10,000 = ₱50,000.',
            'Retrenchment pagkatapos ng 1 taon: mas mababa ang ½ buwan (₱10,000) sa 1 buwang sahod, kaya ₱20,000 ang matatanggap mo.',
            'Sakit pagkatapos ng 4 na taon at 5 buwan (binilang na 4 na taon): 4 × ₱10,000 = ₱40,000.',
          ],
        },
      ],
      faqs: [
        {
          q: 'May separation pay ba kung nag-resign ako?',
          a: 'Wala sa Labor Code. Hindi hinihingi ang separation pay kapag nag-resign ka o natanggal dahil sa just cause, maliban kung ibinibigay ito ng kontrata, patakaran ng kompanya o union agreement.',
        },
        {
          q: 'Sino ang may 1 buwan kada taon ng serbisyo?',
          a: 'Ang mga empleyadong natapos ang trabaho dahil sa redundancy o paglalagay ng labor-saving devices.',
        },
        {
          q: 'Sino ang may ½ buwan kada taon ng serbisyo?',
          a: 'Ang mga natanggal dahil sa retrenchment para maiwasan ang pagkalugi, pagsasarang hindi dahil sa malaking pagkalugi, o sakit na ipinagbabawal ng batas o nakasasama sa kalusugan nila o ng katrabaho. Ang pinakamababa ay laging 1 buwang sahod.',
        },
        {
          q: 'May separation pay ba kung nagsara ang kompanya dahil nalugi?',
          a: 'Wala sa Labor Code kung nagsara dahil sa malaking pagkalugi o problemang pinansiyal. Puwede pa rin itong ibigay ng kontrata o patakaran ng kompanya.',
        },
        {
          q: 'Gaano kaaga dapat magbigay ng abiso ang employer?',
          a: 'Sa redundancy, labor-saving devices, retrenchment o pagsasara, dapat magbigay ang employer ng nakasulat na abiso sa iyo at sa DOLE nang hindi bababa sa 1 buwan bago ang petsa ng pagtatanggal.',
        },
      ],
    },
  },

  'retirement-pay': {
    en: {
      sections: [
        {
          heading: 'How retirement pay is computed',
          steps: [
            'Count your years of service. A fraction of at least 6 months counts as a whole year.',
            'One “½ month salary” = 15 days + 1/12 of your 13th month pay (2.5 days) + 5 days of service incentive leave = 22.5 days’ pay.',
            'Retirement pay = your daily rate × 22.5 × years of service.',
          ],
        },
        {
          heading: 'Example (daily rate ₱700, 20 years and 8 months)',
          points: ['Years counted: 21.', 'Per year: ₱700 × 22.5 = ₱15,750.', 'Retirement pay: ₱15,750 × 21 = ₱330,750.'],
        },
      ],
      faqs: [
        {
          q: 'Who is entitled to retirement pay under RA 7641?',
          a: 'Private employees aged 60 to 65 with at least 5 years of service with the same employer, when the company has no retirement plan or its plan gives less than the law.',
        },
        {
          q: 'Why 22.5 days and not 15 days?',
          a: 'The law defines “½ month salary” as 15 days plus 1/12 of the 13th month pay and the cash equivalent of up to 5 days of service incentive leave, which adds up to 22.5 days’ pay per year.',
        },
        {
          q: 'Is this the same as the SSS pension?',
          a: 'No. Retirement pay comes from your employer. Your SSS retirement pension is separate, and you can get both.',
        },
        {
          q: 'Are small businesses covered?',
          a: 'Retail, service and agricultural businesses with not more than 10 employees are exempt.',
        },
        {
          q: 'What if my company has its own retirement plan?',
          a: 'You get what the plan or union agreement provides, but it cannot be less than what the law gives.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang retirement pay',
          steps: [
            'Bilangin ang taon ng serbisyo. Ang bahagi ng taon na hindi bababa sa 6 na buwan ay buong taon.',
            'Ang isang “½ buwang sahod” = 15 araw + 1/12 ng 13th month pay (2.5 araw) + 5 araw ng service incentive leave = 22.5 araw na sahod.',
            'Retirement pay = daily rate × 22.5 × taon ng serbisyo.',
          ],
        },
        {
          heading: 'Halimbawa (daily rate ₱700, 20 taon at 8 buwan)',
          points: ['Taong binilang: 21.', 'Kada taon: ₱700 × 22.5 = ₱15,750.', 'Retirement pay: ₱15,750 × 21 = ₱330,750.'],
        },
      ],
      faqs: [
        {
          q: 'Sino ang may karapatan sa retirement pay sa ilalim ng RA 7641?',
          a: 'Mga empleyado sa pribadong sektor na edad 60 hanggang 65 na may hindi bababa sa 5 taon ng serbisyo sa iisang employer, kapag walang retirement plan ang kompanya o mas mababa ang ibinibigay ng plano kaysa sa batas.',
        },
        {
          q: 'Bakit 22.5 araw at hindi 15 araw?',
          a: 'Itinuturing ng batas ang “½ buwang sahod” na 15 araw dagdag ang 1/12 ng 13th month pay at cash na katumbas ng hanggang 5 araw ng service incentive leave, kaya 22.5 araw na sahod kada taon.',
        },
        {
          q: 'Pareho ba ito sa SSS pension?',
          a: 'Hindi. Galing sa employer ang retirement pay. Hiwalay ang SSS retirement pension mo, at puwede mong makuha pareho.',
        },
        {
          q: 'Sakop ba ang maliliit na negosyo?',
          a: 'Exempted ang retail, service at agricultural na negosyong may hindi hihigit sa 10 empleyado.',
        },
        {
          q: 'Paano kung may sariling retirement plan ang kompanya?',
          a: 'Iyon ang matatanggap mo ayon sa plano o union agreement, pero hindi ito puwedeng mas mababa sa ibinibigay ng batas.',
        },
      ],
    },
  },
};
