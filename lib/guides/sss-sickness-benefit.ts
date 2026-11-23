import type { Guide } from './types';

// Source: https://www.sss.gov.ph/sickness-benefit/ (read 2026-11-24).
export const sssSicknessBenefit: Guide = {
  slug: 'sss-sickness-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-24',
  sources: [{ name: 'SSS: Sickness Benefit', url: 'https://www.sss.gov.ph/sickness-benefit/' }],
  en: {
    title: 'SSS sickness benefit: who qualifies, how much, and how to file',
    description:
      'Who qualifies for the SSS sickness benefit, how the 90% daily allowance is computed, the filing deadlines, and how to apply online, based on the official SSS page.',
    intro:
      'The SSS sickness benefit is a daily cash allowance for the days you cannot work because of sickness or injury. Deadlines matter here: late notice can reduce or cancel your claim. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'Who qualifies',
        points: [
          'You cannot work because of sickness or injury, and you are confined in a hospital or at home for at least 4 days.',
          'You paid at least 3 monthly contributions in the 12 months before the semester of your sickness or injury. For self-employed, voluntary and OFW members, only contributions paid before that semester count.',
          'You notified your employer (if employed) or SSS (if self-employed, a voluntary member, an OFW, or no longer employed) about your sickness or injury.',
          'If you are employed, you have used up all your paid company sick leave for the year. This does not apply to sea-based OFWs.',
        ],
      },
      {
        heading: 'How much you get',
        text: 'The daily sickness allowance is 90% of your average daily salary credit (ADSC). SSS computes it this way:',
        steps: [
          'Find the semester of contingency: the two quarters ending in the quarter you got sick. Quarters end in March, June, September and December. Contributions in or after this semester are not counted.',
          'Count 12 months back, starting from the month just before that semester.',
          'Add up the 6 highest monthly salary credits (MSC) in those 12 months.',
          'Divide the total by 180 to get your average daily salary credit.',
          'Multiply that by 90% to get your daily sickness allowance.',
          'Multiply the daily allowance by the number of days SSS approves.',
        ],
        note: 'Benefits under the regular SSS program are computed on a monthly salary credit of up to ₱20,000.',
      },
      {
        heading: 'Limits',
        points: [
          'Up to 120 days in one calendar year. Unused days do not carry over to the next year.',
          'Up to 240 days for the same illness. If it lasts longer than 240 days, the claim is treated as a disability claim.',
        ],
      },
      {
        heading: 'Deadlines',
        points: [
          'Employed, confined at home: tell your employer within 5 calendar days after your confinement starts. Your employer tells SSS within 5 calendar days after receiving your notice.',
          'Employed, confined in a hospital: you do not need to notify your employer first. Your employer notifies SSS within 1 year after you are discharged.',
          'Self-employed, voluntary and OFW members: file within 5 calendar days after your home confinement starts, or within 1 year after you are discharged from a hospital.',
          'Missing these deadlines can reduce or deny your claim. If you notify SSS late, your confinement is counted as starting no earlier than 5 days before the date you notified SSS.',
        ],
      },
      {
        heading: 'How to apply if you are employed',
        steps: [
          'Tell your employer right away and give them the SSS Medical Certificate (Med 01688) and certified true copies of your supporting medical documents.',
          'Your employer notifies SSS online through its My.SSS account. You do not need to submit documents at an SSS branch.',
          'Your employer pays the benefit in advance and asks SSS to reimburse it. When SSS emails you, confirm that you received the advance payment within 7 working days, through the link in the email or in your My.SSS account. If you do not, your employer’s reimbursement is rejected.',
        ],
      },
      {
        heading: 'How to apply if you are self-employed, voluntary, an OFW or no longer employed',
        steps: [
          'Log in to your My.SSS account.',
          'Go to the “Benefits” tab and select “Sickness Benefit”.',
          'Fill out the online application form and click “Next”.',
          'Upload all the required documents and click “Next”.',
          'Review your information, tick the certification box, and click “Next”.',
          'Note your transaction number. SSS’s Medical Evaluation Center reviews your application and emails you the result.',
        ],
      },
      {
        heading: 'Documents you need',
        points: [
          'SSS Medical Certificate (Med 01688) showing the complete diagnosis, the recommended number of sick-leave days including recovery, the clinic address, a contact number, and the doctor’s license number written clearly.',
          'For long confinement or illness: laboratory, X-ray, ECG and other test results, or the operating room or clinical record.',
          'If you got sick or injured abroad: documents with English translation, authenticated by the Philippine Embassy or Consulate or notarized in that country.',
          'If you were previously employed: a certificate of separation signed by your former employer’s HR manager, with your separation date (and, if your confinement was during your employment, a statement that no advance payment was given). If your company is on strike, closed, in a pending case with you, or you left on AWOL or bad terms, SSS accepts a notarized Affidavit of Undertaking instead, plus DOLE documents in some cases.',
          'SSS’s medical specialist may ask for more medical records.',
        ],
      },
      {
        heading: 'How you get paid',
        points: [
          'Through your UMID card enrolled as an ATM. Without one, through a PESONet bank account, an e-wallet, or a remittance or cash payout outlet that you enroll in the Disbursement Account Enrollment Module (DAEM) of My.SSS.',
          'When enrolling, you upload proof of the account, a government-issued ID, and a selfie holding the ID and the proof of account.',
          'SSS notifies you by email or SMS when the benefit is credited. Crediting happens within 5 banking days after the claim is settled.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'Some claims must be filed at an SSS branch instead of online: reconsidered denied claims, unclaimed benefits of a deceased member, and unclaimed reimbursements of inactive, closed or retired employers.',
          'File only through the official My.SSS website or app. Never give your password or one-time PIN to anyone who offers to process your claim.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS sickness benefit: sino ang qualified, magkano, at paano mag-file',
    description:
      'Sino ang qualified sa SSS sickness benefit, paano kinukuwenta ang 90% na arawang allowance, mga deadline, at paano mag-apply online, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS sickness benefit ay arawang cash allowance para sa mga araw na hindi ka makapagtrabaho dahil sa sakit o pinsala. Mahalaga ang mga deadline dito: puwedeng mabawasan o hindi maaprubahan ang claim kapag huli ang abiso. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang qualified',
        points: [
          'Hindi ka makapagtrabaho dahil sa sakit o pinsala, at naka-confine ka sa ospital o sa bahay nang hindi bababa sa 4 na araw.',
          'Nakapaghulog ka ng hindi bababa sa 3 buwanang kontribusyon sa loob ng 12 buwan bago ang semester ng pagkakasakit o pinsala. Para sa self-employed, voluntary at OFW, ang mga kontribusyong naihulog lang bago ang semester na iyon ang binibilang.',
          'Naabisuhan mo ang employer mo (kung employed) o ang SSS (kung self-employed, voluntary member, OFW, o wala nang trabaho) tungkol sa sakit o pinsala mo.',
          'Kung employed ka, naubos mo na ang lahat ng bayad na sick leave mo sa kompanya para sa taon. Hindi ito kailangan ng mga sea-based OFW.',
        ],
      },
      {
        heading: 'Magkano ang matatanggap',
        text: 'Ang arawang sickness allowance ay 90% ng iyong average daily salary credit (ADSC). Ganito ito kinukuwenta ng SSS:',
        steps: [
          'Alamin ang semester of contingency: ang dalawang quarter na nagtatapos sa quarter ng pagkakasakit mo. Nagtatapos ang mga quarter sa Marso, Hunyo, Setyembre at Disyembre. Hindi binibilang ang mga kontribusyon sa loob o pagkatapos ng semester na ito.',
          'Magbilang ng 12 buwan pabalik, simula sa buwan bago ang semester na iyon.',
          'Pagsamahin ang 6 na pinakamataas na monthly salary credit (MSC) sa loob ng 12 buwang iyon.',
          'Hatiin sa 180 ang kabuuan para makuha ang average daily salary credit.',
          'I-multiply ito sa 90% para makuha ang arawang sickness allowance.',
          'I-multiply ang arawang allowance sa bilang ng araw na aaprubahan ng SSS.',
        ],
        note: 'Ang mga benepisyo sa regular na SSS program ay kinukuwenta batay sa monthly salary credit na hanggang ₱20,000.',
      },
      {
        heading: 'Mga limitasyon',
        points: [
          'Hanggang 120 araw sa isang taon. Hindi nadadala sa susunod na taon ang mga araw na hindi nagamit.',
          'Hanggang 240 araw para sa parehong sakit. Kapag lumampas sa 240 araw, ituturing na itong disability claim.',
        ],
      },
      {
        heading: 'Mga deadline',
        points: [
          'Employed, naka-confine sa bahay: abisuhan ang employer sa loob ng 5 araw mula nang magsimula ang confinement. Aabisuhan ng employer ang SSS sa loob ng 5 araw mula nang matanggap ang abiso mo.',
          'Employed, naka-confine sa ospital: hindi mo na kailangang abisuhan muna ang employer. Aabisuhan ng employer ang SSS sa loob ng 1 taon mula nang ma-discharge ka.',
          'Self-employed, voluntary at OFW: mag-file sa loob ng 5 araw mula nang magsimula ang confinement sa bahay, o sa loob ng 1 taon mula nang ma-discharge sa ospital.',
          'Kapag lumampas sa mga deadline, puwedeng mabawasan o hindi maaprubahan ang claim. Kung huli kang nag-abiso sa SSS, ituturing na nagsimula ang confinement mo nang hindi mas maaga sa 5 araw bago ang petsa ng abiso mo.',
        ],
      },
      {
        heading: 'Paano mag-apply kung employed ka',
        steps: [
          'Abisuhan agad ang employer at ibigay ang SSS Medical Certificate (Med 01688) at certified true copy ng mga sumusuportang medical document.',
          'Aabisuhan ng employer ang SSS online gamit ang My.SSS account nito. Hindi mo na kailangang magsumite ng dokumento sa SSS branch.',
          'Babayaran ka ng employer nang in advance at hihingi ito ng reimbursement sa SSS. Kapag nag-email ang SSS, kumpirmahin na natanggap mo ang advance payment sa loob ng 7 araw ng trabaho, gamit ang link sa email o ang My.SSS account mo. Kung hindi, mare-reject ang reimbursement ng employer mo.',
        ],
      },
      {
        heading: 'Paano mag-apply kung self-employed, voluntary, OFW o wala nang trabaho',
        steps: [
          'Mag-log in sa My.SSS account mo.',
          'Pumunta sa “Benefits” tab at piliin ang “Sickness Benefit”.',
          'Sagutan ang online application form at i-click ang “Next”.',
          'I-upload ang lahat ng kailangang dokumento at i-click ang “Next”.',
          'Suriin ang impormasyon, lagyan ng tsek ang certification box, at i-click ang “Next”.',
          'Itala ang transaction number mo. Susuriin ng Medical Evaluation Center ng SSS ang application mo at ie-email sa iyo ang resulta.',
        ],
      },
      {
        heading: 'Mga dokumentong kailangan',
        points: [
          'SSS Medical Certificate (Med 01688) na may kumpletong diagnosis, inirerekomendang bilang ng araw ng sick leave kasama ang pagpapagaling, address ng clinic, contact number, at malinaw na nakasulat na license number ng doktor.',
          'Para sa matagal na confinement o sakit: resulta ng laboratory, X-ray, ECG at iba pang test, o operating room o clinical record.',
          'Kung sa ibang bansa nagkasakit o napinsala: mga dokumentong may English translation, authenticated ng Philippine Embassy o Consulate o notaryado sa bansang iyon.',
          'Kung dati kang employed: certificate of separation na pirmado ng HR manager ng dati mong employer, may petsa ng paghiwalay (at, kung habang employed ka na-confine, nakasaad na walang advance payment na ibinigay). Kung naka-strike, sarado, may kaso kayo, o umalis ka nang AWOL o may alitan, tumatanggap ang SSS ng notaryadong Affidavit of Undertaking, at mga dokumento mula sa DOLE sa ilang kaso.',
          'Puwedeng humingi ang medical specialist ng SSS ng iba pang medical record.',
        ],
      },
      {
        heading: 'Paano ka babayaran',
        points: [
          'Sa UMID card mo na naka-enroll bilang ATM. Kung wala nito, sa PESONet bank account, e-wallet, o remittance o cash payout outlet na ie-enroll mo sa Disbursement Account Enrollment Module (DAEM) ng My.SSS.',
          'Sa pag-enroll, mag-upload ng patunay ng account, government-issued ID, at selfie habang hawak ang ID at ang patunay ng account.',
          'Aabisuhan ka ng SSS sa email o SMS kapag na-credit na ang benepisyo. Nai-credit ito sa loob ng 5 banking day mula nang ma-settle ang claim.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'May mga claim na kailangang i-file sa SSS branch sa halip na online: muling isinaalang-alang na denied claim, hindi pa nakukuhang benepisyo ng namatay na miyembro, at hindi pa nakukuhang reimbursement ng inactive, sarado o retiradong employer.',
          'Mag-file lamang sa opisyal na My.SSS website o app. Huwag ibigay ang password o one-time PIN mo sa sinumang nag-aalok na sila ang magpoproseso ng claim mo.',
        ],
      },
    ],
  },
};
