import type { Guide } from './types';

// Source: https://www.sss.gov.ph/death-benefit/ (read 2026-11-25). Every condition and amount below is on that page.
export const sssDeathBenefit: Guide = {
  slug: 'sss-death-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-25',
  sources: [{ name: 'SSS: Death Benefit', url: 'https://www.sss.gov.ph/death-benefit/' }],
  en: {
    title: 'SSS death benefit: who can claim, how much, and how to file',
    description: 'Who gets the SSS death benefit (pension or lump sum), how the amount is computed, and the documents to file, based on the official SSS page.',
    intro:
      'When an SSS member dies, the beneficiaries can get a death benefit, paid as a monthly pension or a lump sum. Here is who can claim and how much, from the official SSS page. The funeral benefit is separate.',
    sections: [
      {
        heading: 'Who can claim',
        points: [
          'Primary beneficiaries: the dependent spouse (until they remarry) and dependent children who are unmarried, not gainfully employed, and under 21 (or over 21 if permanently incapacitated since birth or childhood).',
          'If there are none: the dependent parents (secondary beneficiaries).',
          'If there are none: anyone the member designated in SSS records; otherwise the legal heirs.',
        ],
      },
      {
        heading: 'Monthly pension or lump sum',
        points: [
          'Monthly pension (for life): to primary beneficiaries, if the member paid at least 36 monthly contributions before the semester of death.',
          'Lump sum: to primary beneficiaries if the member paid fewer than 36; or to secondary beneficiaries.',
        ],
      },
      {
        heading: 'How much',
        text: 'The monthly pension is the highest of:',
        points: [
          '₱300 + 20% of the average monthly salary credit (AMSC) + 2% of the AMSC × (credited years of service − 10);',
          '40% of the AMSC; or',
          'the minimum pension: ₱1,000 with less than 10 credited years of service, ₱1,200 with at least 10, ₱2,400 with at least 20.',
        ],
        note: 'Lump sum for primary beneficiaries: the monthly pension × contributions paid, or 12 × the pension, whichever is higher. Secondary beneficiaries get 36 × the pension if the member paid at least 36 contributions; otherwise the same formula as above.',
      },
      {
        heading: 'Other benefits for pensioners',
        points: [
          'A 13th month pension every December.',
          '₱1,000 additional benefit each month (since January 1, 2017).',
          'Dependent’s pension for each qualified child (up to 5, youngest first): 10% of the monthly pension or ₱250, whichever is higher.',
        ],
      },
      {
        heading: 'How to file',
        text: 'File at any SSS branch. A qualified dependent spouse with an SS number and a My.SSS account can also file online.',
        points: [
          'Death Claim Application form.',
          'Death certificate registered with the Local Civil Registry or issued by the PSA (if no funeral benefit was settled yet). For deaths abroad, the foreign death certificate or a Report of Death from the Philippine Embassy or Consulate.',
          'A UMID card enrolled as an ATM card, or proof of a disbursement account.',
          'Valid IDs, and other documents SSS asks for depending on the claimant.',
        ],
      },
      {
        heading: 'Deductions',
        text: 'Unpaid short-term SSS loans of the member are deducted in full from the benefit.',
      },
    ],
  },
  fil: {
    title: 'SSS death benefit: sino ang puwedeng mag-claim, magkano, at paano mag-file',
    description: 'Sino ang makakatanggap ng SSS death benefit (pension o lump sum), paano kinukuwenta, at mga dokumentong kailangan, batay sa opisyal na pahina ng SSS.',
    intro:
      'Kapag namatay ang miyembro ng SSS, puwedeng makatanggap ng death benefit ang mga beneficiary, bilang buwanang pension o lump sum. Narito kung sino ang puwedeng mag-claim at magkano, mula sa opisyal na pahina ng SSS. Hiwalay ang funeral benefit.',
    sections: [
      {
        heading: 'Sino ang puwedeng mag-claim',
        points: [
          'Primary beneficiaries: ang dependent na asawa (hangga’t hindi nag-aasawang muli) at mga dependent na anak na walang asawa, walang trabaho, at wala pang 21 (o lampas 21 kung permanenteng may kapansanan mula pagkapanganak o pagkabata).',
          'Kung wala: ang mga dependent na magulang (secondary beneficiaries).',
          'Kung wala rin: ang taong itinalaga ng miyembro sa rekord ng SSS; kung wala, ang mga legal na tagapagmana.',
        ],
      },
      {
        heading: 'Buwanang pension o lump sum',
        points: [
          'Buwanang pension (habambuhay): sa primary beneficiaries, kung may hindi bababa sa 36 na buwanang hulog ang miyembro bago ang semester ng pagkamatay.',
          'Lump sum: sa primary beneficiaries kung kulang sa 36 ang hulog; o sa secondary beneficiaries.',
        ],
      },
      {
        heading: 'Magkano',
        text: 'Ang buwanang pension ay ang pinakamataas sa:',
        points: [
          '₱300 + 20% ng average monthly salary credit (AMSC) + 2% ng AMSC × (credited years of service − 10);',
          '40% ng AMSC; o',
          'ang pinakamababang pension: ₱1,000 kung kulang sa 10 credited years of service, ₱1,200 kung hindi bababa sa 10, ₱2,400 kung hindi bababa sa 20.',
        ],
        note: 'Lump sum para sa primary beneficiaries: buwanang pension × bilang ng hulog, o 12 × pension, alinman ang mas mataas. Ang secondary beneficiaries ay may 36 × pension kung may hindi bababa sa 36 na hulog ang miyembro; kung wala, ang parehong pormula sa itaas.',
      },
      {
        heading: 'Iba pang benepisyo ng pensioner',
        points: [
          '13th month pension tuwing Disyembre.',
          '₱1,000 na dagdag na benepisyo kada buwan (mula Enero 1, 2017).',
          'Dependent’s pension para sa bawat qualified na anak (hanggang 5, simula sa bunso): 10% ng buwanang pension o ₱250, alinman ang mas mataas.',
        ],
      },
      {
        heading: 'Paano mag-file',
        text: 'Mag-file sa alinmang sangay ng SSS. Puwede ring mag-file online ang qualified na dependent na asawa na may SS number at My.SSS account.',
        points: [
          'Death Claim Application form.',
          'Death certificate na rehistrado sa Local Civil Registry o mula sa PSA (kung wala pang na-settle na funeral benefit). Kung namatay sa ibang bansa, ang death certificate mula roon o Report of Death mula sa Embahada o Konsulado ng Pilipinas.',
          'UMID card na naka-enroll bilang ATM, o patunay ng disbursement account.',
          'Mga valid ID, at iba pang dokumentong hihingin ng SSS depende sa nagke-claim.',
        ],
      },
      {
        heading: 'Mga kaltas',
        text: 'Buong ibabawas sa benepisyo ang hindi pa nababayarang short-term loan ng miyembro sa SSS.',
      },
    ],
  },
};
