import { LABOR_CHECKED_ON, LABOR_CODE_SOURCE } from '../labor.ts';
import type { Guide } from './types';

// From the Labor Code, Arts. 283 and 284 (now 298 and 299), full text on LawPhil (read 2026-11-25).
export const separationPayGuide: Guide = {
  slug: 'separation-pay',
  category: 'trabaho',
  checkedOn: LABOR_CHECKED_ON,
  sources: [LABOR_CODE_SOURCE],
  en: {
    title: 'Separation pay in the Philippines: who gets it and how much',
    description: 'When the Labor Code requires separation pay, how much it is (1 month or ½ month per year of service), and when you get none, from the law’s official text.',
    intro:
      'Separation pay is money your employer must give you when your job ends for certain reasons that are not your fault. The Labor Code (Articles 298 and 299, formerly 283 and 284) says when it is due and the minimum amount.',
    sections: [
      {
        heading: 'One month’s pay per year of service',
        text: 'If you lose your job because of labor-saving devices (for example, you were replaced by machines) or redundancy, you get at least 1 month’s pay or 1 month’s pay for every year of service, whichever is higher.',
      },
      {
        heading: 'Half a month’s pay per year of service',
        points: [
          'Retrenchment to prevent losses.',
          'Closure or stopping of operations that is not due to serious business losses.',
          'Termination because of a disease that the law prohibits or that harms your health or your co-workers’ health.',
        ],
        note: 'In these cases you get at least 1 month’s pay or ½ month’s pay for every year of service, whichever is higher.',
      },
      {
        heading: 'Counting your years of service',
        text: 'A fraction of at least 6 months counts as one whole year. For example, 4 years and 7 months counts as 5 years; 4 years and 5 months counts as 4 years.',
      },
      {
        heading: 'Examples (monthly pay of ₱20,000)',
        points: [
          'Redundancy after 4 years and 7 months: 5 years × ₱20,000 = ₱100,000.',
          'Retrenchment after 4 years and 7 months: 5 years × ₱10,000 = ₱50,000.',
          'Retrenchment after 1 year: ½ month (₱10,000) is less than 1 month’s pay, so you get ₱20,000.',
        ],
      },
      {
        heading: 'When the law gives no separation pay',
        points: [
          'The company closed because of serious business losses or financial reverses.',
          'You resigned, or you were dismissed for a just cause.',
        ],
        note: 'Your contract, company policy or union agreement may still give separation pay in these cases.',
      },
      {
        heading: 'Good to know',
        points: [
          'The employer must give you and DOLE written notice at least 1 month before the termination date for redundancy, labor-saving devices, retrenchment or closure.',
          'These are minimums: your employer can give more.',
        ],
      },
    ],
  },
  fil: {
    title: 'Separation pay sa Pilipinas: sino ang makakatanggap at magkano',
    description: 'Kailan hinihingi ng Labor Code ang separation pay, magkano ito (1 buwan o ½ buwan kada taon ng serbisyo), at kailan walang matatanggap, mula sa opisyal na teksto ng batas.',
    intro:
      'Ang separation pay ay perang dapat ibigay ng employer kapag natapos ang trabaho mo sa ilang dahilang hindi mo kasalanan. Sinasabi ng Labor Code (Artikulo 298 at 299, dating 283 at 284) kung kailan ito dapat ibigay at ang pinakamababang halaga.',
    sections: [
      {
        heading: 'Isang buwang sahod kada taon ng serbisyo',
        text: 'Kung nawalan ka ng trabaho dahil sa labor-saving devices (halimbawa, pinalitan ka ng makina) o redundancy, makakatanggap ka ng hindi bababa sa 1 buwang sahod o 1 buwang sahod kada taon ng serbisyo, alinman ang mas mataas.',
      },
      {
        heading: 'Kalahating buwang sahod kada taon ng serbisyo',
        points: [
          'Retrenchment para maiwasan ang pagkalugi.',
          'Pagsasara o pagtigil ng operasyon na hindi dahil sa malaking pagkalugi.',
          'Pagkatanggal dahil sa sakit na ipinagbabawal ng batas o nakasasama sa kalusugan mo o ng mga katrabaho mo.',
        ],
        note: 'Sa mga kasong ito, makakatanggap ka ng hindi bababa sa 1 buwang sahod o ½ buwang sahod kada taon ng serbisyo, alinman ang mas mataas.',
      },
      {
        heading: 'Pagbilang ng taon ng serbisyo',
        text: 'Ang bahagi ng taon na hindi bababa sa 6 na buwan ay binibilang na isang buong taon. Halimbawa, ang 4 na taon at 7 buwan ay binibilang na 5 taon; ang 4 na taon at 5 buwan ay 4 na taon.',
      },
      {
        heading: 'Mga halimbawa (buwanang sahod na ₱20,000)',
        points: [
          'Redundancy pagkatapos ng 4 na taon at 7 buwan: 5 taon × ₱20,000 = ₱100,000.',
          'Retrenchment pagkatapos ng 4 na taon at 7 buwan: 5 taon × ₱10,000 = ₱50,000.',
          'Retrenchment pagkatapos ng 1 taon: mas mababa ang ½ buwan (₱10,000) sa 1 buwang sahod, kaya ₱20,000 ang matatanggap mo.',
        ],
      },
      {
        heading: 'Kailan walang separation pay sa batas',
        points: ['Nagsara ang kompanya dahil sa malaking pagkalugi o problemang pinansiyal.', 'Nag-resign ka, o natanggal ka dahil sa just cause.'],
        note: 'Puwede pa ring magbigay ng separation pay ang kontrata, patakaran ng kompanya o union agreement sa mga kasong ito.',
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Dapat magbigay ang employer ng nakasulat na abiso sa iyo at sa DOLE nang hindi bababa sa 1 buwan bago ang petsa ng pagtatanggal dahil sa redundancy, labor-saving devices, retrenchment o pagsasara.',
          'Pinakamababa lang ang mga ito: puwedeng magbigay nang higit ang employer.',
        ],
      },
    ],
  },
};
