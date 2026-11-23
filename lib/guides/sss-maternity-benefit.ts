import type { Guide } from './types';

// Source: https://www.sss.gov.ph/maternity-benefit/ (read 2026-11-24).
// Covers the member side for contingencies on or after March 11, 2019 (RA 11210).
export const sssMaternityBenefit: Guide = {
  slug: 'sss-maternity-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-24',
  sources: [{ name: 'SSS: Maternity Benefit', url: 'https://www.sss.gov.ph/maternity-benefit/' }],
  en: {
    title: 'SSS maternity benefit: who qualifies, how much, and how to apply',
    description:
      'Who qualifies for the SSS maternity benefit, how it is computed (105, 120 or 60 days), the documents you need, and how to file online, based on the official SSS page.',
    intro:
      'The SSS maternity benefit is a daily cash allowance for female members who cannot work because of childbirth, miscarriage or emergency termination of pregnancy (ETP). It is given for every pregnancy, whatever your civil status or employment status, whether or not the child is legitimate, and however many times you have given birth. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'Who qualifies',
        points: [
          'You paid at least 3 monthly contributions in the 12 months before the semester of your childbirth, miscarriage or ETP. Only contributions paid before that semester count.',
          'If you are employed: you told your employer about your pregnancy and your expected delivery date, and your employer passed this notice to SSS.',
          'If you are self-employed, a voluntary member, a non-working spouse or an OFW: you told SSS directly about your pregnancy and your expected delivery date.',
        ],
      },
      {
        heading: 'How much you get',
        points: [
          'The daily allowance is 100% of your average daily salary credit (ADSC).',
          '105 days for live childbirth, normal or caesarean.',
          '120 days for qualified solo parents under the Solo Parents’ Welfare Act (105 days plus 15 days).',
          '60 days for miscarriage or ETP, including stillbirth.',
          'Only one benefit is paid per delivery, even for twins, triplets or more.',
          'Employed members get full pay: the SSS benefit plus a salary differential from the employer. The exceptions are distressed establishments, retail or service businesses with 10 workers or fewer, micro-businesses with total assets of ₱3 million or less, and employers that already give the same or a bigger benefit.',
          'Self-employed members, non-working spouses, voluntary members and OFWs receive the SSS benefit only.',
        ],
      },
      {
        heading: 'How SSS computes it',
        steps: [
          'Find the semester of contingency: the two quarters ending in the quarter of your childbirth, miscarriage or ETP. Quarters end in March, June, September and December. Contributions in or after this semester are not counted.',
          'Count 12 months back, starting from the month just before that semester.',
          'Add up the 6 highest monthly salary credits (MSC) in those 12 months.',
          'Divide the total by 180. The result is your average daily salary credit, which is your daily maternity allowance.',
          'Multiply it by 105, 120 or 60 days, depending on your case.',
        ],
        note: 'SSS notes that benefits under the regular SSS program are computed on contributions up to the ₱20,000 monthly salary credit.',
      },
      {
        heading: 'Telling SSS about your pregnancy',
        points: [
          'Employed members: once your pregnancy is confirmed, give your employer the Maternity Notification Form with proof of pregnancy, such as a pregnancy test signed by a physician or municipal health officer, an ultrasound, a blood pregnancy test (Beta HCG) or an early pregnancy factor test. Your employer then notifies SSS through its My.SSS account.',
          'Self-employed, voluntary, non-working spouse and OFW members: notify SSS yourself through your My.SSS account, the SSS Mobile App, or a Self-Service Express Terminal.',
        ],
      },
      {
        heading: 'How to apply',
        steps: [
          'Enroll your disbursement account (bank or e-wallet) in the Disbursement Account Enrollment Module (DAEM) of your My.SSS account. You can enroll up to three.',
          'File your Maternity Benefit Application (MBA) online through your My.SSS account. Employers file their reimbursement application (MBRA) through their own My.SSS account.',
          'Upload clear scans of the colored originals or certified true copies of your documents (see the list below).',
          'Watch for the electronic notice when the benefit is credited. You can also check the status in the Inquiry module of My.SSS.',
        ],
      },
      {
        heading: 'Documents you need',
        points: [
          'Live childbirth: your child’s Certificate of Live Birth registered with the Local Civil Registrar, with its official or acknowledgement receipt, if you file within 6 months of delivery; a PSA-issued copy with receipt if you file later; or a Report of Birth from a Philippine Embassy, Consulate or the PSA (or the foreign equivalent with English translation).',
          'Stillbirth or fetal death: the Certificate of Fetal Death, following the same Local Civil Registrar or PSA rule.',
          'Miscarriage, ETP, ectopic pregnancy or molar pregnancy: proof of pregnancy, proof that the pregnancy ended (both signed by a physician), and a medical certificate, consultation records or clinical abstract signed by a physician.',
          'Solo parents: a valid Solo Parent ID, or a certification of eligibility from your LGU signed by the social worker and the mayor. Your delivery date must fall within its validity; for first-time solo parents, it must be issued within 6 months of delivery.',
          'Previously employed or separated members filing as self-employed, voluntary or OFW: a Certificate of Separation showing your separation date and that your employer gave no advance payment, if the delivery happened during your employment or within 6 months after you left. If you cannot get one, SSS accepts an Affidavit of Undertaking in specific cases, such as a strike, a closed company, or a pending case.',
          'Medical documents issued in the Philippines must show the physician’s name and PRC license number; electronically issued ones must come with the official receipt. Documents from abroad need an English translation if applicable, but no embassy authentication or apostille.',
        ],
      },
      {
        heading: 'How it is paid',
        points: [
          'If you are employed, your employer pays the full benefit in advance within 30 days of your maternity leave application, and SSS reimburses your employer.',
          'SSS pays you directly if you are self-employed, a voluntary member, a non-working spouse or an OFW, or if you gave birth while employed but are now unemployed, temporarily laid off, separated, or your company is on lockout or strike.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'Maternity leave cannot be deferred. It is taken before or after delivery without interruption, as long as the total does not exceed 105 days (or 60 days), and the leave after delivery is never less than 60 days.',
          'You can give up to 7 days of your leave to the child’s father, married or not, or to a qualified alternate caregiver (a relative up to the fourth degree, or your current partner living in the same household). Your own leave is reduced by the same number of days. This option does not apply to miscarriage or ETP.',
          'You can file up to 10 years after the delivery, miscarriage or ETP.',
          'You cannot receive the SSS sickness benefit for the same days you receive the maternity benefit.',
          'These rules apply to childbirth, miscarriage and ETP on or after March 11, 2019.',
          'File only through the official My.SSS website or app. Never give your password or one-time PIN to anyone who offers to process your claim.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS maternity benefit: sino ang qualified, magkano, at paano mag-apply',
    description:
      'Sino ang qualified sa SSS maternity benefit, paano ito kinukuwenta (105, 120 o 60 araw), mga dokumentong kailangan, at paano mag-file online, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS maternity benefit ay arawang cash allowance para sa mga babaeng miyembro na hindi makapagtrabaho dahil sa panganganak, pagkakunan (miscarriage) o emergency termination of pregnancy (ETP). Ibinibigay ito sa bawat pagbubuntis, anuman ang civil status o employment status mo, lehitimo man o hindi ang anak, at kahit ilang beses ka nang nanganak. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang qualified',
        points: [
          'Nakapaghulog ka ng hindi bababa sa 3 buwanang kontribusyon sa loob ng 12 buwan bago ang semester ng panganganak, pagkakunan o ETP. Ang mga kontribusyong naihulog lang bago ang semester na iyon ang binibilang.',
          'Kung employed ka: naipaalam mo sa employer ang pagbubuntis mo at ang inaasahang petsa ng panganganak, at ipinasa ito ng employer sa SSS.',
          'Kung self-employed, voluntary member, non-working spouse o OFW ka: direktang naipaalam mo sa SSS ang pagbubuntis mo at ang inaasahang petsa ng panganganak.',
        ],
      },
      {
        heading: 'Magkano ang matatanggap',
        points: [
          'Ang arawang allowance ay 100% ng iyong average daily salary credit (ADSC).',
          '105 araw para sa live childbirth, normal man o caesarean.',
          '120 araw para sa qualified na solo parent sa ilalim ng Solo Parents’ Welfare Act (105 araw at dagdag na 15 araw).',
          '60 araw para sa pagkakunan o ETP, kasama ang stillbirth.',
          'Isang benepisyo lang ang ibinibigay sa bawat panganganak, kahit kambal, triplets o higit pa.',
          'Ang mga employed ay may full pay: ang benepisyo ng SSS at ang salary differential mula sa employer. Hindi kasama rito ang mga distressed establishment, retail o service na negosyo na may 10 manggagawa o mas kaunti, micro-business na may kabuuang assets na ₱3 milyon pababa, at mga employer na nagbibigay na ng pareho o mas malaking benepisyo.',
          'Ang self-employed, non-working spouse, voluntary member at OFW ay ang benepisyo lang ng SSS ang matatanggap.',
        ],
      },
      {
        heading: 'Paano ito kinukuwenta ng SSS',
        steps: [
          'Alamin ang semester of contingency: ang dalawang quarter na nagtatapos sa quarter ng panganganak, pagkakunan o ETP. Nagtatapos ang mga quarter sa Marso, Hunyo, Setyembre at Disyembre. Hindi binibilang ang mga kontribusyon sa loob o pagkatapos ng semester na ito.',
          'Magbilang ng 12 buwan pabalik, simula sa buwan bago ang semester na iyon.',
          'Pagsamahin ang 6 na pinakamataas na monthly salary credit (MSC) sa loob ng 12 buwang iyon.',
          'Hatiin sa 180 ang kabuuan. Ito ang average daily salary credit mo, na siya ring arawang maternity allowance mo.',
          'I-multiply ito sa 105, 120 o 60 araw, depende sa kaso mo.',
        ],
        note: 'Ayon sa SSS, ang mga benepisyo sa regular na SSS program ay kinukuwenta batay sa kontribusyon hanggang ₱20,000 na monthly salary credit.',
      },
      {
        heading: 'Pag-abiso sa SSS tungkol sa pagbubuntis',
        points: [
          'Mga employed: kapag kumpirmado na ang pagbubuntis, ibigay sa employer ang Maternity Notification Form kasama ang patunay ng pagbubuntis, gaya ng pregnancy test na pirmado ng doktor o municipal health officer, ultrasound, blood pregnancy test (Beta HCG) o early pregnancy factor test. Ang employer ang mag-aabiso sa SSS gamit ang My.SSS account nito.',
          'Self-employed, voluntary, non-working spouse at OFW: ikaw mismo ang mag-abiso sa SSS gamit ang My.SSS account mo, ang SSS Mobile App, o ang Self-Service Express Terminal.',
        ],
      },
      {
        heading: 'Paano mag-apply',
        steps: [
          'I-enroll ang disbursement account mo (bangko o e-wallet) sa Disbursement Account Enrollment Module (DAEM) ng My.SSS account mo. Hanggang tatlo ang puwedeng i-enroll.',
          'I-file online ang Maternity Benefit Application (MBA) gamit ang My.SSS account mo. Ang mga employer naman ay nagfa-file ng reimbursement application (MBRA) gamit ang sarili nilang My.SSS account.',
          'Mag-upload ng malinaw na scan ng colored na orihinal o certified true copy ng mga dokumento mo (tingnan ang listahan sa ibaba).',
          'Abangan ang electronic notice kapag na-credit na ang benepisyo. Puwede mo ring tingnan ang status sa Inquiry module ng My.SSS.',
        ],
      },
      {
        heading: 'Mga dokumentong kailangan',
        points: [
          'Live childbirth: Certificate of Live Birth ng anak na rehistrado sa Local Civil Registrar, kasama ang official o acknowledgement receipt, kung magfa-file ka sa loob ng 6 na buwan mula panganganak; kopyang galing PSA kasama ang resibo kung mas huli kang magfa-file; o Report of Birth mula sa Philippine Embassy, Consulate o PSA (o katumbas na dokumento mula sa ibang bansa na may English translation).',
          'Stillbirth o fetal death: Certificate of Fetal Death, sa parehong patakaran ng Local Civil Registrar o PSA.',
          'Pagkakunan, ETP, ectopic pregnancy o molar pregnancy: patunay ng pagbubuntis, patunay na natapos ang pagbubuntis (parehong pirmado ng doktor), at medical certificate, records of consultation o clinical abstract na pirmado ng doktor.',
          'Solo parent: valid na Solo Parent ID, o certification of eligibility mula sa LGU na pirmado ng social worker at ng mayor. Dapat pasok ang petsa ng panganganak sa validity nito; para sa first-time solo parent, dapat inisyu ito sa loob ng 6 na buwan mula panganganak.',
          'Dating employed o separated na nagfa-file bilang self-employed, voluntary o OFW: Certificate of Separation na nagsasaad ng petsa ng paghiwalay at na walang advance payment mula sa employer, kung nanganak ka habang employed o sa loob ng 6 na buwan pagkaalis mo. Kung hindi ka makakuha nito, tumatanggap ang SSS ng Affidavit of Undertaking sa ilang sitwasyon, gaya ng strike, sarado nang kompanya, o may nakabinbing kaso.',
          'Ang mga medical document na inisyu sa Pilipinas ay dapat may pangalan at PRC license number ng doktor; ang mga electronically issued ay dapat may kasamang official receipt. Ang mga dokumento mula sa ibang bansa ay kailangan ng English translation kung kailangan, pero hindi na kailangan ng authentication ng embahada o apostille.',
        ],
      },
      {
        heading: 'Paano ito ibinabayad',
        points: [
          'Kung employed ka, babayaran ng employer nang buo at in advance ang benepisyo sa loob ng 30 araw mula sa maternity leave application mo, at ire-reimburse ito ng SSS sa employer.',
          'Direktang magbabayad ang SSS sa iyo kung self-employed, voluntary member, non-working spouse o OFW ka, o kung nanganak ka habang employed pero ngayon ay walang trabaho, pansamantalang na-lay off, nahiwalay na sa trabaho, o naka-lockout o naka-strike ang kompanya mo.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Hindi puwedeng ipagpaliban ang maternity leave. Kinukuha ito bago o pagkatapos manganak nang tuloy-tuloy, basta hindi lalampas sa 105 araw (o 60 araw), at hindi bababa sa 60 araw ang leave pagkatapos manganak.',
          'Puwede mong ibigay ang hanggang 7 araw ng leave mo sa ama ng bata, kasal man kayo o hindi, o sa qualified na alternate caregiver (kamag-anak hanggang ikaapat na antas, o kasalukuyang partner na kasama mo sa bahay). Mababawasan ang sarili mong leave ng parehong bilang ng araw. Hindi ito puwede sa pagkakunan o ETP.',
          'Puwede kang mag-file hanggang 10 taon mula sa panganganak, pagkakunan o ETP.',
          'Hindi ka puwedeng tumanggap ng SSS sickness benefit para sa parehong mga araw na may maternity benefit ka.',
          'Ang mga patakarang ito ay para sa panganganak, pagkakunan at ETP noong Marso 11, 2019 o pagkatapos nito.',
          'Mag-file lamang sa opisyal na My.SSS website o app. Huwag ibigay ang password o one-time PIN mo sa sinumang nag-aalok na sila ang magpoproseso ng claim mo.',
        ],
      },
    ],
  },
};
