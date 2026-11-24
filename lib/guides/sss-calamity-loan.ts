import type { Guide } from './types';

// Source: https://www.sss.gov.ph/calamity-loan/ (SSS Circular 2025-004 rules, read 2026-11-25). Every condition and amount below is on that page.
export const sssCalamityLoan: Guide = {
  slug: 'sss-calamity-loan',
  category: 'sss-gsis',
  checkedOn: '2026-11-25',
  sources: [{ name: 'SSS: Calamity Loan Program', url: 'https://www.sss.gov.ph/calamity-loan/' }],
  en: {
    title: 'SSS calamity loan: who can apply, how much, interest and repayment',
    description: 'Requirements, loan amount, 7% interest, fees and the 24-month repayment of the SSS Calamity Loan for members in areas under a state of calamity, from the official SSS page.',
    intro:
      'The SSS Calamity Loan is a short-term loan for members who live or work in an area declared under a state of calamity. Here is who qualifies, how much you can borrow and how to pay it back, from the official SSS page.',
    sections: [
      {
        heading: 'Who can apply',
        points: [
          'At least 36 posted monthly contributions, 6 of them in the 12 months before the month you apply.',
          'Self-employed, voluntary (including non-working spouse) and land-based OFW members also need 6 posted contributions under their current membership type.',
          'Your registered home address is in an area declared under a state of calamity, or your employer is located there, at the time of the calamity.',
          'You are of legal age and under 65, with no past-due SSS loans and no outstanding restructured loan.',
          'No final benefit received (such as retirement or total disability), unless it was cancelled.',
          'Up-to-date contact information, and an active disbursement account enrolled in My.SSS (DAEM).',
          'If employed, your employer must be up to date on its contributions and loan payments.',
        ],
      },
      {
        heading: 'How much you can borrow',
        text: 'The average of your 12 latest posted monthly salary credits (regular SS program), rounded up to the next MSC, or the amount you apply for, whichever is lower.',
      },
      {
        heading: 'Interest and fees',
        points: [
          '7% a year on the diminishing balance (10% if you used a penalty condonation in the past 5 years).',
          'A 1% service fee, deducted from the loan.',
          'Interest from the loan date to the end of the month before your first payment month is deducted in advance. SSS’s example: ₱20,000 × 7% × 46 days ÷ 365 = ₱176.44.',
          'Late payments: a 1% penalty a month.',
        ],
      },
      {
        heading: 'Repayment',
        points: [
          '24 equal monthly payments, starting the second month after the loan is approved.',
          'Each payment is due by the last day of the month after the month it covers.',
          'Employed members pay through payroll deduction. Self-employed, voluntary and OFW members pay with a PRN at SSS branches or accredited collecting partners.',
        ],
      },
      {
        heading: 'Renewal',
        text: 'You can renew 6 months after approval if your loan is not past due and your last 3 payments were on time. The remaining balance is deducted from the new loan.',
      },
      {
        heading: 'How the money is released',
        text: 'To your UMID card enrolled as an ATM card, or to a PESONet bank account in your name enrolled in My.SSS. If you are employed, your employer must certify your application online in My.SSS.',
      },
    ],
  },
  fil: {
    title: 'SSS calamity loan: sino ang puwedeng mag-apply, magkano, interes at pagbabayad',
    description: 'Mga kailangan, halaga ng loan, 7% na interes, bayarin at 24 na buwang pagbabayad ng SSS Calamity Loan para sa mga miyembrong nasa lugar na may state of calamity, mula sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS Calamity Loan ay short-term loan para sa mga miyembrong nakatira o nagtatrabaho sa lugar na idineklarang nasa state of calamity. Narito kung sino ang qualified, magkano ang mahihiram at paano ito babayaran, mula sa opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang puwedeng mag-apply',
        points: [
          'Hindi bababa sa 36 na naka-post na buwanang hulog, 6 dito sa loob ng 12 buwan bago ang buwan ng aplikasyon.',
          'Ang self-employed, voluntary (kasama ang non-working spouse) at land-based OFW ay kailangan din ng 6 na hulog sa kasalukuyang uri ng membership.',
          'Nasa lugar na may state of calamity ang rehistradong address mo, o doon nakalagay ang employer mo, noong nangyari ang kalamidad.',
          'Nasa hustong gulang at wala pang 65, walang overdue na SSS loan at walang restructured loan.',
          'Hindi pa nakatanggap ng final benefit (gaya ng retirement o total disability), maliban kung kinansela ito.',
          'Updated ang contact information, at may aktibong disbursement account na naka-enroll sa My.SSS (DAEM).',
          'Kung empleyado, dapat updated ang employer sa hulog at bayad sa loan.',
        ],
      },
      {
        heading: 'Magkano ang mahihiram',
        text: 'Ang average ng 12 pinakahuling naka-post na monthly salary credit (regular SS program), ni-round up sa susunod na MSC, o ang halagang inaplayan, alinman ang mas mababa.',
      },
      {
        heading: 'Interes at bayarin',
        points: [
          '7% kada taon sa lumiliit na balanse (10% kung gumamit ng penalty condonation sa nakaraang 5 taon).',
          '1% na service fee, ibabawas sa loan.',
          'Ibabawas nang maaga ang interes mula sa petsa ng loan hanggang katapusan ng buwan bago ang unang buwan ng bayad. Halimbawa ng SSS: ₱20,000 × 7% × 46 araw ÷ 365 = ₱176.44.',
          'Huling bayad: 1% na multa kada buwan.',
        ],
      },
      {
        heading: 'Pagbabayad',
        points: [
          '24 na pantay na buwanang hulog, simula sa ikalawang buwan pagkatapos maaprubahan ang loan.',
          'Ang bawat hulog ay dapat bayaran hanggang sa huling araw ng buwan pagkatapos ng buwang sakop nito.',
          'Sa payroll deduction nagbabayad ang mga empleyado. Ang self-employed, voluntary at OFW ay nagbabayad gamit ang PRN sa sangay ng SSS o accredited na collecting partner.',
        ],
      },
      {
        heading: 'Renewal',
        text: 'Puwedeng mag-renew 6 na buwan pagkatapos maaprubahan kung hindi overdue ang loan at nabayaran sa oras ang huling 3 hulog. Ibabawas sa bagong loan ang natitirang balanse.',
      },
      {
        heading: 'Paano ibibigay ang pera',
        text: 'Sa UMID card na naka-enroll bilang ATM, o sa PESONet bank account sa pangalan mo na naka-enroll sa My.SSS. Kung empleyado ka, kailangang i-certify ng employer ang aplikasyon mo online sa My.SSS.',
      },
    ],
  },
};
