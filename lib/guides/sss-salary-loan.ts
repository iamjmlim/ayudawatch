import type { Guide } from './types';

// Source: https://www.sss.gov.ph/salary-loan/ (read 2026-11-23).
// Every requirement, amount, rate and step below is stated on that page.
export const sssSalaryLoan: Guide = {
  slug: 'sss-salary-loan',
  category: 'sss-gsis',
  checkedOn: '2026-11-23',
  sources: [{ name: 'SSS: Salary Loan', url: 'https://www.sss.gov.ph/salary-loan/' }],
  en: {
    title: 'SSS salary loan: who can apply, how much, and how to apply',
    description:
      'Requirements, loan amount, interest, repayment and how to apply for an SSS salary loan online, based on the official SSS page.',
    intro:
      'The SSS salary loan is a short-term cash loan for SSS members. You apply online through your My.SSS account, and the money goes to your enrolled card or bank account. Here is what the official SSS page says about who qualifies, how much you can get, and how to pay it back.',
    sections: [
      {
        heading: 'Who can apply',
        text: 'Employed members (including kasambahay), self-employed members, voluntary members (including non-working spouses) and land-based OFW members can apply if they meet these conditions:',
        points: [
          'For a one-month loan: at least 36 posted monthly contributions, 6 of them within the 12 months before the month you apply.',
          'For a two-month loan: at least 72 posted monthly contributions, 6 of them within the 12 months before the month you apply.',
          'Self-employed, voluntary (including non-working spouse) and land-based OFW members also need at least 6 posted monthly contributions under their current membership type before the month they apply.',
          'If you are employed, your employer must be up to date on its SSS contributions and loan payments.',
          'You must be of legal age and below 65 when you apply.',
          'You must have no past-due salary loan or other SSS member loan.',
          'You must not have received a final benefit such as retirement or permanent total disability, unless it was cancelled (for example, because you went back to work).',
          'You must not have been disqualified for fraud against SSS.',
          'Your contact information in SSS records must be up to date.',
          'You must have an active disbursement account enrolled in My.SSS through the Disbursement Account Enrollment Module (DAEM).',
        ],
      },
      {
        heading: 'How much you can borrow',
        points: [
          'One-month loan: the average of your 12 latest posted Monthly Salary Credits (MSC), rounded up to the next higher MSC, or the amount you apply for, whichever is lower.',
          'Two-month loan: twice that average, or the amount you apply for, whichever is lower.',
          'What you receive is the approved amount minus a 1% service fee, pro-rated interest, and any unpaid balance of your previous short-term SSS loans.',
        ],
      },
      {
        heading: 'Interest, fees and penalties',
        points: [
          '8% interest per year on the diminishing balance for a first loan, or a renewal if you have not used a penalty condonation program in the past five years.',
          '10% interest per year on the diminishing balance for a renewal if you used a penalty condonation program in the past five years.',
          'A 1% service fee is deducted from the loan.',
          'Late monthly payments are charged a penalty of 1% per month.',
          'If the loan is still unpaid after the loan term, 10% yearly interest and a 1% monthly penalty apply until it is fully paid.',
          'SSS says the interest rate may change with market conditions, and any change is announced through official SSS channels.',
        ],
      },
      {
        heading: 'How to pay it back',
        points: [
          'The loan is paid in 24 equal monthly payments.',
          'Payments start on the second month after the month your loan is approved.',
          'Each payment is due on or before the last day of the following month. For example, the payment for March is due by the end of April. If the deadline falls on a weekend or holiday, you can pay on the next working day.',
          'If you are employed, your employer deducts the payment from your salary and sends it to SSS.',
          'Self-employed, voluntary and land-based OFW members pay on their own using a Payment Reference Number (PRN) at an SSS branch with a teller or at an SSS-accredited payment partner.',
          'A loan is in default if the unpaid amount is more than six monthly payments, or if there is still a balance after the loan term. The full balance then becomes due, and SSS can deduct unpaid loans from your future SSS benefits.',
        ],
      },
      {
        heading: 'How to apply',
        steps: [
          'Make sure your contact information in My.SSS is up to date.',
          'Enroll a disbursement account in My.SSS through the Disbursement Account Enrollment Module (DAEM): an active MySSS Card or UMID ATM Pay Card, or a PESONet bank account in your own name.',
          'Log in to your My.SSS account on the SSS website or in the MySSS mobile app, and file your salary loan application online.',
          'If you are employed, your employer certifies your application in its own My.SSS account.',
          'Once approved, the money is sent to your enrolled disbursement account.',
        ],
      },
      {
        heading: 'Renewing your loan',
        points: [
          'You can renew six months after your loan was approved, if the loan is not past due and your last three monthly payments were on time. The remaining balance is deducted from the new loan.',
          'A fully paid loan can be renewed right away if your last three payments were on time. If any of them was late, you can renew three months after full payment.',
          'After deductions, the new loan must give you at least ₱2,000 (₱100 for kasambahay).',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'A salary loan cannot be cancelled, but you can pay the full balance early.',
          'Apply only through the official My.SSS website or MySSS app. Never give your My.SSS password or one-time PIN to anyone, including people who offer to process your loan.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS salary loan: sino ang puwede, magkano, at paano mag-apply',
    description:
      'Mga requirement, halaga ng loan, interes, pagbabayad at paano mag-apply ng SSS salary loan online, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS salary loan ay panandaliang cash loan para sa mga miyembro ng SSS. Online ang pag-apply gamit ang iyong My.SSS account, at ipinapadala ang pera sa naka-enroll mong card o bank account. Narito ang sinasabi ng opisyal na pahina ng SSS tungkol sa kung sino ang puwede, magkano ang makukuha, at paano ito babayaran.',
    sections: [
      {
        heading: 'Sino ang puwedeng mag-apply',
        text: 'Puwedeng mag-apply ang mga employed na miyembro (kasama ang kasambahay), self-employed, voluntary member (kasama ang non-working spouse) at land-based OFW kung pasok sila sa mga kondisyong ito:',
        points: [
          'Para sa one-month loan: hindi bababa sa 36 na naihulog (posted) na buwanang kontribusyon, at 6 dito ay sa loob ng 12 buwan bago ang buwan ng pag-apply.',
          'Para sa two-month loan: hindi bababa sa 72 na naihulog na buwanang kontribusyon, at 6 dito ay sa loob ng 12 buwan bago ang buwan ng pag-apply.',
          'Ang self-employed, voluntary (kasama ang non-working spouse) at land-based OFW ay kailangan ding may hindi bababa sa 6 na naihulog na kontribusyon sa kasalukuyan nilang uri ng membership bago ang buwan ng pag-apply.',
          'Kung employed ka, dapat updated ang employer mo sa paghuhulog ng kontribusyon at bayad sa loan sa SSS.',
          'Dapat nasa legal na edad ka at wala pang 65 taong gulang sa araw ng pag-apply.',
          'Dapat wala kang overdue na salary loan o ibang loan sa SSS.',
          'Dapat hindi ka pa nabigyan ng final benefit gaya ng retirement o permanent total disability, maliban kung kinansela ito (halimbawa, dahil bumalik ka sa trabaho).',
          'Dapat hindi ka na-disqualify dahil sa pandaraya laban sa SSS.',
          'Dapat updated ang contact information mo sa record ng SSS.',
          'Dapat may aktibo kang disbursement account na naka-enroll sa My.SSS sa pamamagitan ng Disbursement Account Enrollment Module (DAEM).',
        ],
      },
      {
        heading: 'Magkano ang puwedeng hiramin',
        points: [
          'One-month loan: ang average ng 12 pinakabagong naihulog mong Monthly Salary Credit (MSC), ni-round up sa susunod na mas mataas na MSC, o ang halagang inaplayan mo, alinman ang mas mababa.',
          'Two-month loan: doble ng average na iyon, o ang halagang inaplayan mo, alinman ang mas mababa.',
          'Ang matatanggap mo ay ang aprubadong halaga bawas ang 1% service fee, ang pro-rated na interes, at anumang natitirang balanse ng dati mong short-term loan sa SSS.',
        ],
      },
      {
        heading: 'Interes, bayarin at multa',
        points: [
          '8% na interes kada taon sa lumiliit na balanse para sa unang loan, o sa renewal kung hindi ka gumamit ng penalty condonation program sa nakaraang limang taon.',
          '10% na interes kada taon sa lumiliit na balanse para sa renewal kung gumamit ka ng penalty condonation program sa nakaraang limang taon.',
          'May 1% service fee na ibinabawas sa loan.',
          'May multang 1% kada buwan ang mga huling hulog.',
          'Kung may utang pa pagkatapos ng loan term, may 10% na interes kada taon at 1% na multa kada buwan hanggang mabayaran nang buo.',
          'Ayon sa SSS, puwedeng magbago ang interes depende sa kalagayan ng merkado, at iaanunsyo ito sa mga opisyal na channel ng SSS.',
        ],
      },
      {
        heading: 'Paano ito babayaran',
        points: [
          'Babayaran ang loan sa 24 na pantay na buwanang hulog.',
          'Magsisimula ang hulog sa ikalawang buwan pagkatapos ng buwan ng pag-apruba ng loan.',
          'Ang bawat hulog ay dapat bayaran hanggang sa huling araw ng sumunod na buwan. Halimbawa, ang hulog para sa Marso ay dapat bayaran hanggang katapusan ng Abril. Kung Sabado, Linggo o holiday ang deadline, puwedeng magbayad sa susunod na araw ng trabaho.',
          'Kung employed ka, ang employer mo ang magbabawas ng hulog sa sahod mo at magpapadala nito sa SSS.',
          'Ang self-employed, voluntary at land-based OFW ay magbabayad nang sarili gamit ang Payment Reference Number (PRN) sa SSS branch na may teller o sa accredited na payment partner ng SSS.',
          'Ituturing na default ang loan kung ang hindi nabayaran ay higit sa anim na buwanang hulog, o kung may balanse pa pagkatapos ng loan term. Sisingilin na nang buo ang balanse, at puwedeng ibawas ng SSS ang utang sa mga susunod mong benepisyo sa SSS.',
        ],
      },
      {
        heading: 'Paano mag-apply',
        steps: [
          'Siguraduhing updated ang contact information mo sa My.SSS.',
          'Mag-enroll ng disbursement account sa My.SSS sa pamamagitan ng Disbursement Account Enrollment Module (DAEM): aktibong MySSS Card o UMID ATM Pay Card, o PESONet bank account na nakapangalan sa iyo.',
          'Mag-log in sa My.SSS account mo sa website ng SSS o sa MySSS mobile app, at i-file online ang salary loan application.',
          'Kung employed ka, iko-certify ng employer mo ang application sa sarili nitong My.SSS account.',
          'Kapag naaprubahan, ipapadala ang pera sa naka-enroll mong disbursement account.',
        ],
      },
      {
        heading: 'Pag-renew ng loan',
        points: [
          'Puwedeng mag-renew anim na buwan pagkatapos maaprubahan ang loan, kung hindi ito overdue at nasa oras ang huling tatlong buwanang hulog mo. Ibabawas sa bagong loan ang natitirang balanse.',
          'Ang loan na bayad na nang buo ay puwedeng i-renew agad kung nasa oras ang huling tatlong hulog mo. Kung may nahuli sa mga ito, puwedeng mag-renew tatlong buwan pagkatapos ng buong bayad.',
          'Pagkatapos ng mga bawas, dapat hindi bababa sa ₱2,000 ang matatanggap mo sa bagong loan (₱100 para sa kasambahay).',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Hindi puwedeng kanselahin ang salary loan, pero puwede mong bayaran nang buo nang maaga.',
          'Mag-apply lamang sa opisyal na My.SSS website o MySSS app. Huwag ibigay kahit kanino ang My.SSS password o one-time PIN mo, kahit sa mga nag-aalok na sila ang magpoproseso ng loan mo.',
        ],
      },
    ],
  },
};
