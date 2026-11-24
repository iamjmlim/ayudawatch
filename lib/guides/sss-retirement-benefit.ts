import type { Guide } from './types';

// Source: https://www.sss.gov.ph/retirement-benefit/ (read 2026-11-24).
export const sssRetirementBenefit: Guide = {
  slug: 'sss-retirement-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-25',
  sources: [
    { name: 'SSS: Retirement Benefit', url: 'https://www.sss.gov.ph/retirement-benefit/' },
    { name: 'Department of Finance: SSS 2026 pension increase (June 2, 2026)', url: 'https://www.dof.gov.ph/sss-begins-early-june-rollout-of-2026-pension-hike-citing-need-for-early-relief-for-pensioners/' },
    { name: 'Department of Finance: SSS pension increase rollout (September 8, 2025)', url: 'https://www.dof.gov.ph/sss-rolls-out-pension-increase-and-new-benefit-cards-under-rectos-directive-to-better-serve-members/' },
  ],
  en: {
    title: 'SSS retirement pension: who qualifies, how much, and how to apply',
    description:
      'The ages and contributions you need for the SSS retirement pension or lump sum, how the monthly pension is computed, extra benefits, and how to file online, based on the official SSS page.',
    intro:
      'The SSS retirement benefit is paid either as a monthly pension for life or as a one-time lump sum to members who can no longer work because of old age. Which one you get depends on how many contributions you have paid. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'Monthly pension or lump sum',
        points: [
          'Monthly pension: paid for life if you paid at least 120 monthly contributions before the semester of your retirement.',
          'Lump sum: a one-time payment of your total contributions plus interest, if you paid fewer than 120.',
          'If you have fewer than 120 contributions, you can keep paying as a voluntary member until you complete 120 and qualify for the monthly pension.',
        ],
      },
      {
        heading: 'Who qualifies',
        points: [
          'Optional retirement: at least 60 years old, and no longer employed, self-employed, working as an OFW or working as a household helper. Underground and surface mineworkers can retire at 50.',
          'Technical retirement: at least 65 years old, whether or not you are still working. Underground and surface mineworkers can retire at 60, and racehorse jockeys at 55.',
          'Total disability pensioners who have recovered and are at least 60 (50 for mineworkers).',
          'Former pensioners whose pension was suspended because they went back to work, once they stop working again.',
        ],
      },
      {
        heading: 'How the monthly pension is computed',
        text: 'Your pension is whichever of these three gives the highest amount:',
        points: [
          '₱300, plus 20% of your average monthly salary credit (AMSC), plus 2% of your AMSC for every credited year of service beyond 10.',
          '40% of your AMSC.',
          'The minimum pension: ₱1,200 if you have at least 10 credited years of service, or ₱2,400 if you have at least 20.',
        ],
      },
      {
        heading: 'Extra benefits',
        points: [
          'A 13th-month pension every December.',
          'Since January 1, 2017, an additional ₱1,000 on top of your monthly pension.',
          'You can choose to receive your first 18 monthly pensions in advance as a lump sum, discounted at an interest rate set by SSS. You must choose this when you first file.',
          'Dependent’s pension for each dependent child: 10% of your pension or ₱250, whichever is higher, for up to 5 children starting with the youngest. The child must have been conceived or legally adopted on or before your retirement date, and must be unmarried, not working, and below 21 (or incapacitated since childhood).',
        ],
      },
      {
        heading: 'What may be deducted',
        points: [
          'All unpaid short-term SSS loans, in full.',
          'Unemployment benefits that must be returned in some cases, overlapping sickness or partial disability benefits, and pension overpaid after a dependent dies, marries or gets a job.',
        ],
      },
      {
        heading: 'How to apply',
        steps: [
          'Register for a My.SSS account on the SSS website, if you do not have one yet.',
          'Make sure you have a UMID card enrolled as an ATM, or enroll a disbursement account in the Disbursement Account Enrollment Module (DAEM) of My.SSS. This must be done before you file.',
          'File your retirement claim online through the My.SSS portal. Employed, self-employed, voluntary and land-based OFW members all file online.',
          'If you want your first 18 months of pension in advance, choose that option when you file.',
        ],
      },
      {
        heading: 'When you must file at an SSS branch',
        points: [
          'You have an unpaid Stock Investment, Privatization, Educational or Vocational Technology loan.',
          'A dependent child is under guardianship, or you are incapacitated, under guardianship, or confined in a prison or rehabilitation center.',
          'Your claim falls under the Portability Law or a bilateral social security agreement with another country.',
          'Your claim needs adjustment or re-evaluation, or it is an unclaimed benefit of a deceased member.',
        ],
      },
      {
        heading: 'Pension increases 2025 to 2027',
        points: [
          'Under the SSS Pension Reform Program, retirement and disability pensions rise 10% a year, and death and survivor pensions 5% a year, from 2025 to 2027.',
          'The first increase started in September 2025. The second was moved up to June 2026: pensioners as of May 31, 2026 got it from June 1, and those who retired from June 1 to August 31, 2026 get the higher pension from September 1, 2026.',
          'The last increase is scheduled for September 2027. Because the increases compound, retirement pensions end up about 33% higher than before the program.',
          'SSS says these increases come without any increase in member contributions.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'If you retire before 65 and go back to work or self-employment, your pension is suspended and you must contribute again. At 65 you can claim retirement whether or not you are working.',
          'If you retire more than once, you get the higher of your first pension or the recomputed pension.',
          'When a pensioner dies, the primary beneficiaries receive 100% of the monthly pension. If the pensioner dies within 60 months of the first pension and has no primary beneficiaries, the secondary beneficiaries get a lump sum for the rest of the five-year guaranteed period.',
          'File only through the official My.SSS website or app. Never give your password or one-time PIN to anyone who offers to process your claim.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS retirement pension: sino ang qualified, magkano, at paano mag-apply',
    description:
      'Ang edad at kontribusyong kailangan para sa SSS retirement pension o lump sum, paano kinukuwenta ang buwanang pension, mga dagdag na benepisyo, at paano mag-file online, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS retirement benefit ay ibinibigay bilang buwanang pension habambuhay o bilang isang beses na lump sum sa mga miyembrong hindi na makapagtrabaho dahil sa katandaan. Depende sa dami ng naihulog mong kontribusyon kung alin ang matatanggap mo. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Buwanang pension o lump sum',
        points: [
          'Buwanang pension: habambuhay, kung nakapaghulog ka ng hindi bababa sa 120 buwanang kontribusyon bago ang semester ng pagreretiro mo.',
          'Lump sum: isang beses na bayad ng kabuuang kontribusyon mo kasama ang interes, kung kulang sa 120 ang naihulog mo.',
          'Kung kulang sa 120 ang kontribusyon mo, puwede kang magpatuloy maghulog bilang voluntary member hanggang makumpleto ang 120 at maging qualified sa buwanang pension.',
        ],
      },
      {
        heading: 'Sino ang qualified',
        points: [
          'Optional retirement: hindi bababa sa 60 taong gulang, at wala nang trabaho, hindi na self-employed, OFW o household helper. Ang underground at surface mineworker ay puwedeng magretiro sa edad na 50.',
          'Technical retirement: hindi bababa sa 65 taong gulang, nagtatrabaho pa man o hindi. Ang underground at surface mineworker ay puwedeng magretiro sa 60, at ang racehorse jockey sa 55.',
          'Mga total disability pensioner na gumaling na at hindi bababa sa 60 taong gulang (50 para sa mineworker).',
          'Mga dating pensioner na nasuspinde ang pension dahil bumalik sa trabaho, kapag tumigil na ulit sila sa pagtatrabaho.',
        ],
      },
      {
        heading: 'Paano kinukuwenta ang buwanang pension',
        text: 'Ang pension mo ay alinman sa tatlong ito ang magbibigay ng pinakamataas na halaga:',
        points: [
          '₱300, dagdag ang 20% ng average monthly salary credit (AMSC) mo, dagdag ang 2% ng AMSC mo sa bawat credited year of service na lampas sa 10.',
          '40% ng AMSC mo.',
          'Ang minimum na pension: ₱1,200 kung may hindi bababa sa 10 credited year of service, o ₱2,400 kung may hindi bababa sa 20.',
        ],
      },
      {
        heading: 'Mga dagdag na benepisyo',
        points: [
          '13th-month pension tuwing Disyembre.',
          'Mula Enero 1, 2017, dagdag na ₱1,000 sa buwanang pension.',
          'Puwede mong piliing matanggap nang in advance ang unang 18 buwanang pension bilang lump sum, na may diskuwento sa interes na itatakda ng SSS. Kailangan itong piliin sa unang pag-file.',
          'Dependent’s pension para sa bawat dependent na anak: 10% ng pension mo o ₱250, alinman ang mas mataas, para sa hanggang 5 anak simula sa bunso. Dapat naipagbuntis na o legal nang inampon ang anak bago o sa araw ng pagreretiro mo, at dapat walang asawa, walang trabaho, at wala pang 21 taong gulang (o may kapansanan mula pagkabata).',
        ],
      },
      {
        heading: 'Ano ang puwedeng ibawas',
        points: [
          'Lahat ng hindi pa bayad na short-term loan sa SSS, nang buo.',
          'Unemployment benefit na kailangang ibalik sa ilang kaso, nagsabay na sickness o partial disability benefit, at sobrang pension na naibayad matapos mamatay, mag-asawa o magkatrabaho ang isang dependent.',
        ],
      },
      {
        heading: 'Paano mag-apply',
        steps: [
          'Magparehistro ng My.SSS account sa website ng SSS, kung wala ka pa nito.',
          'Siguraduhing may UMID card ka na naka-enroll bilang ATM, o mag-enroll ng disbursement account sa Disbursement Account Enrollment Module (DAEM) ng My.SSS. Kailangan itong gawin bago mag-file.',
          'I-file online ang retirement claim gamit ang My.SSS portal. Online nagfa-file ang employed, self-employed, voluntary at land-based OFW.',
          'Kung gusto mong matanggap nang in advance ang unang 18 buwan ng pension, piliin ito sa pag-file.',
        ],
      },
      {
        heading: 'Kailan kailangang mag-file sa SSS branch',
        points: [
          'May hindi pa bayad na Stock Investment, Privatization, Educational o Vocational Technology loan.',
          'May dependent na anak na nasa ilalim ng guardianship, o ikaw ay may kapansanan, nasa ilalim ng guardianship, o naka-confine sa kulungan o rehabilitation center.',
          'Ang claim mo ay sakop ng Portability Law o ng bilateral social security agreement sa ibang bansa.',
          'Kailangang i-adjust o suriin muli ang claim, o ito ay hindi pa nakukuhang benepisyo ng namatay na miyembro.',
        ],
      },
      {
        heading: 'Mga dagdag sa pension 2025 hanggang 2027',
        points: [
          'Sa ilalim ng SSS Pension Reform Program, tumataas nang 10% kada taon ang retirement at disability pension, at 5% kada taon ang death at survivor pension, mula 2025 hanggang 2027.',
          'Nagsimula ang unang dagdag noong Setyembre 2025. Inagahan ang ikalawa sa Hunyo 2026: natanggap ito mula Hunyo 1 ng mga pensioner hanggang Mayo 31, 2026, at ang mga nagretiro mula Hunyo 1 hanggang Agosto 31, 2026 ay tatanggap ng mas mataas na pension mula Setyembre 1, 2026.',
          'Nakatakda ang huling dagdag sa Setyembre 2027. Dahil nagpapatong-patong ang mga dagdag, magiging humigit-kumulang 33% na mas mataas ang retirement pension kaysa bago ang programa.',
          'Ayon sa SSS, walang dagdag sa kontribusyon ng mga miyembro dahil sa mga dagdag na ito.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Kung nagretiro ka bago mag-65 at bumalik sa trabaho o sa sariling negosyo, masususpinde ang pension mo at kailangan mong maghulog ulit. Pagdating ng 65, puwede ka nang mag-claim ng retirement nagtatrabaho ka man o hindi.',
          'Kung higit sa isang beses kang nagretiro, matatanggap mo ang mas mataas sa unang pension mo o sa muling kinuwentang pension.',
          'Kapag namatay ang pensioner, 100% ng buwanang pension ang matatanggap ng primary beneficiaries. Kung namatay ang pensioner sa loob ng 60 buwan mula sa unang pension at walang primary beneficiary, makakatanggap ang secondary beneficiaries ng lump sum para sa natitirang bahagi ng limang taong guaranteed period.',
          'Mag-file lamang sa opisyal na My.SSS website o app. Huwag ibigay ang password o one-time PIN mo sa sinumang nag-aalok na sila ang magpoproseso ng claim mo.',
        ],
      },
    ],
  },
};
