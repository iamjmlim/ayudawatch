import type { Guide } from './types';

// Source: https://www.sss.gov.ph/disability-benefit/ (read 2026-11-25). Every condition and amount below is on that page.
export const sssDisabilityBenefit: Guide = {
  slug: 'sss-disability-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-25',
  sources: [{ name: 'SSS: Disability Benefit', url: 'https://www.sss.gov.ph/disability-benefit/' }],
  en: {
    title: 'SSS disability benefit: who qualifies, how much, and how to file',
    description: 'Who can get the SSS disability benefit, pension versus lump sum, the minimum pension, and the documents to file, based on the official SSS page.',
    intro:
      'The SSS disability benefit is cash paid as a monthly pension or a lump sum to a member who becomes permanently disabled, totally or partially. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'Who qualifies',
        text: 'A member with permanent partial or permanent total disability, with at least 1 monthly contribution paid before the semester of the disability.',
        points: [
          'Permanent total disability includes complete loss of sight of both eyes, loss of two limbs at or above the ankles or wrists, permanent complete paralysis of two limbs, and other cases SSS approves.',
          'Permanent partial disability includes complete and permanent loss or loss of use of a finger, thumb, big toe, hand, arm, foot, leg, ear, hearing, or the sight of one eye.',
        ],
      },
      {
        heading: 'Monthly pension or lump sum',
        points: [
          'Monthly pension: if you paid at least 36 monthly contributions before the semester of disability.',
          'Lump sum: if you paid fewer than 36, or if the benefit is assessed as payable for less than 12 months.',
          'The minimum monthly pension is ₱1,000 with less than 10 credited years of service, ₱1,200 with at least 10, and ₱2,400 with at least 20.',
        ],
      },
      {
        heading: 'How the lump sum is computed',
        points: [
          'Permanent total disability: the monthly pension × the number of contributions paid before the semester of disability, or 12 × the monthly pension, whichever is higher.',
          'Permanent partial disability: the monthly pension × the number of contributions × the percentage of disability, or the monthly pension × 12 × the percentage, whichever is higher.',
        ],
        note: 'SSS’s example: ₱1,000 pension, 24 contributions, 20% disability gives ₱4,800 (₱1,000 × 24 × 20%), which is higher than ₱2,400 (₱1,000 × 12 × 20%).',
      },
      {
        heading: 'Other benefits for pensioners',
        points: [
          '₱1,000 additional benefit (since January 2017) plus a ₱500 supplemental disability allowance each month.',
          'A 13th month pension every December (for partial disability, if the pension lasts at least 12 months).',
          'Total disability pensioners: each dependent child (up to 5, youngest first) gets 10% of the pension or ₱250, whichever is higher.',
        ],
      },
      {
        heading: 'Documents to file',
        points: [
          'Disability Claim Application (DisCA) form.',
          'SSS Medical Certificate filled out by your doctor within 6 months before filing.',
          'Certified true copies of supporting medical records.',
          'Your SS card or another valid ID (UMID, passport, driver’s license, National ID and others).',
        ],
        note: 'Some conditions have waiting periods before you can file, for example 4 months after a fracture or stroke. The SSS page lists them by condition.',
      },
      {
        heading: 'How you get paid',
        text: 'Through your UMID card enrolled as an ATM card or a disbursement account (PESONet bank, e-wallet or remittance/cash payout outlet) enrolled in My.SSS. Crediting takes 5 to 7 banking days after the claim is settled.',
      },
      {
        heading: 'Keep your pension active',
        text: 'Pensions stop if you go back to work, resume self-employment or recover from total disability, and are suspended if you do not report for the yearly Annual Confirmation of Pensioners (ACOP).',
      },
    ],
  },
  fil: {
    title: 'SSS disability benefit: sino ang qualified, magkano, at paano mag-file',
    description: 'Sino ang makakatanggap ng SSS disability benefit, pension o lump sum, ang pinakamababang pension, at mga dokumentong kailangan, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS disability benefit ay perang ibinibigay bilang buwanang pension o lump sum sa miyembrong permanenteng nabaldado, buo man o bahagya. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang qualified',
        text: 'Miyembrong may permanent partial o permanent total disability, na may hindi bababa sa 1 buwanang hulog bago ang semester ng pagkabaldado.',
        points: [
          'Kasama sa permanent total disability ang lubusang pagkabulag ng dalawang mata, pagkawala ng dalawang braso o binti sa o lampas ng bukong-bukong o pulso, permanenteng paralisis ng dalawang braso o binti, at iba pang kasong aaprubahan ng SSS.',
          'Kasama sa permanent partial disability ang lubusan at permanenteng pagkawala o hindi na magamit na daliri, hinlalaki, hinlalaki sa paa, kamay, braso, paa, binti, tainga, pandinig, o paningin ng isang mata.',
        ],
      },
      {
        heading: 'Buwanang pension o lump sum',
        points: [
          'Buwanang pension: kung may hindi bababa sa 36 na buwanang hulog bago ang semester ng pagkabaldado.',
          'Lump sum: kung kulang sa 36, o kung tinasang mas maikli sa 12 buwan ang benepisyo.',
          'Ang pinakamababang buwanang pension ay ₱1,000 kung kulang sa 10 credited years of service, ₱1,200 kung hindi bababa sa 10, at ₱2,400 kung hindi bababa sa 20.',
        ],
      },
      {
        heading: 'Paano kinukuwenta ang lump sum',
        points: [
          'Permanent total disability: buwanang pension × bilang ng hulog bago ang semester ng pagkabaldado, o 12 × buwanang pension, alinman ang mas mataas.',
          'Permanent partial disability: buwanang pension × bilang ng hulog × porsiyento ng pagkabaldado, o buwanang pension × 12 × porsiyento, alinman ang mas mataas.',
        ],
        note: 'Halimbawa ng SSS: ₱1,000 na pension, 24 na hulog, 20% na pagkabaldado ay ₱4,800 (₱1,000 × 24 × 20%), na mas mataas sa ₱2,400 (₱1,000 × 12 × 20%).',
      },
      {
        heading: 'Iba pang benepisyo ng pensioner',
        points: [
          '₱1,000 na dagdag na benepisyo (mula Enero 2017) at ₱500 na supplemental disability allowance kada buwan.',
          '13th month pension tuwing Disyembre (sa partial disability, kung hindi bababa sa 12 buwan ang pension).',
          'Total disability pensioner: bawat dependent na anak (hanggang 5, simula sa bunso) ay may 10% ng pension o ₱250, alinman ang mas mataas.',
        ],
      },
      {
        heading: 'Mga dokumentong kailangan',
        points: [
          'Disability Claim Application (DisCA) form.',
          'SSS Medical Certificate na sinagutan ng doktor sa loob ng 6 na buwan bago mag-file.',
          'Certified true copy ng mga medical record.',
          'SS card o iba pang valid ID (UMID, pasaporte, lisensiya, National ID at iba pa).',
        ],
        note: 'May mga kondisyong may hinihintay na panahon bago makapag-file, halimbawa 4 na buwan pagkatapos ng bali o stroke. Nakalista ang mga ito sa pahina ng SSS ayon sa kondisyon.',
      },
      {
        heading: 'Paano ka babayaran',
        text: 'Sa UMID card na naka-enroll bilang ATM o sa disbursement account (PESONet bank, e-wallet o remittance/cash payout outlet) na naka-enroll sa My.SSS. 5 hanggang 7 banking days ang pag-credit pagkatapos ma-settle ang claim.',
      },
      {
        heading: 'Panatilihing aktibo ang pension',
        text: 'Ititigil ang pension kung bumalik ka sa trabaho, nag-self-employ muli o gumaling mula sa total disability, at sususpindihin kung hindi ka nag-report sa taunang Annual Confirmation of Pensioners (ACOP).',
      },
    ],
  },
};
