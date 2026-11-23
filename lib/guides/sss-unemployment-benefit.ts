import type { Guide } from './types';

// Source: https://www.sss.gov.ph/unemployment-benefit/ (read 2026-11-24).
// The page does not state the benefit amount, so this guide does not either.
export const sssUnemploymentBenefit: Guide = {
  slug: 'sss-unemployment-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-24',
  sources: [{ name: 'SSS: Unemployment Benefit', url: 'https://www.sss.gov.ph/unemployment-benefit/' }],
  en: {
    title: 'SSS unemployment benefit: who qualifies and how to claim',
    description:
      'Who can claim the SSS unemployment benefit after losing a job involuntarily, the requirements and deadline, and the online and DOLE certification steps, based on the official SSS page.',
    intro:
      'The SSS unemployment benefit is cash help for covered employees, including kasambahay, and OFWs who lose their job through no choice of their own. You file the claim online in My.SSS, then get a certification of involuntary separation from DOLE. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'Who qualifies',
        points: [
          'You were not over 60 years old when you lost your job. For underground or surface mineworkers the limit is 50; for racehorse jockeys, 55.',
          'You have paid at least 36 monthly contributions, and 12 of them were in the 18 months right before the month you lost your job.',
          'You have not received an unemployment benefit in the 3 years before the date you lost your job.',
          'You were separated from your job involuntarily (see below).',
        ],
      },
      {
        heading: 'What counts as involuntary separation',
        points: [
          'Termination for authorized causes under the Labor Code: labor-saving devices, redundancy, retrenchment or downsizing, closure of the business, or an illness that makes continued work prohibited by law or harmful to you or your co-workers.',
          'Resigning without notice because of serious insult, inhuman and unbearable treatment, or a crime committed by your employer or its representative against you or your immediate family, or similar causes. You must back this up with substantial evidence if DOLE and SSS ask for it.',
          'Economic downturn, natural or human-made disasters, and other similar cases that DOLE and SSS decide on.',
          'For OFWs, DOLE decides the reason for separation through the POEA.',
          'Closure counts only if all branches of your employer closed. If only your branch closed, the reason is treated as retrenchment or redundancy.',
        ],
      },
      {
        heading: 'Who does not qualify',
        points: [
          'Employees dismissed for just causes, as long as the employer followed due process: serious misconduct, willful disobedience, gross and habitual neglect of duties, fraud or willful breach of trust, a crime or offense, or similar cases such as abandonment.',
          'Employees on floating status who have not been terminated and are waiting to go back to work. But if your employment contract ends without you being recalled, you count as involuntarily separated, from the start of your floating status.',
          'OFWs with a finished overseas contract who were never deployed or never left the Philippines.',
        ],
      },
      {
        heading: 'Deadline and limits',
        points: [
          'File within 1 year from the date you lost your job.',
          'You can claim only once every 3 years.',
          'If you qualify for two or more benefits for the same period, only the highest one is paid.',
          'SSS can deduct the benefit from your future SSS benefits if you are rehired within the benefit period or within 2 months of losing your job, if a case you filed ends with your reinstatement and back wages or upholds your dismissal for a just cause, or if benefits overlap.',
        ],
      },
      {
        heading: 'Before you apply',
        points: [
          'A registered My.SSS account.',
          'A UMID card enrolled as an ATM, or an approved disbursement account enrolled in the Disbursement Account Enrollment Module (DAEM) of My.SSS.',
        ],
      },
      {
        heading: 'How to claim',
        steps: [
          'Log in to My.SSS and click “Unemployment Benefit” under the Benefits tab.',
          'Choose your UMID-ATM card or disbursement account, your employment category, the date you lost your job, your employer’s SSS-registered name, and the DOLE, POLO or POEA office where you will get your certification.',
          'Confirm the declarations. SSS emails you a Transaction Number and instructions for the DOLE certification.',
          'Within 30 calendar days, apply for the Electronic Certification of Involuntary Separation: local employees and kasambahay at the DOLE field or provincial office where the employer is located; OFWs at the POEA central office, a One-Stop Service Center for OFWs, a POEA regional center or satellite office, or the POLO where the foreign employer operates. If you miss the 30 days, your claim is cancelled and you must file again; SSS emails a reminder one week before.',
          'Bring your Transaction Number, one valid ID with your photo and signature, and your Notice of Termination (or a notarized Affidavit of Termination if you have none). OFWs also bring an employment contract verified by POLO and/or proof of arrival, such as the Bureau of Immigration stamp in your passport. Bring a Certificate of Pending Case or a police report if it applies to you.',
          'DOLE certifies your separation within 3 working days of receiving complete documents. You do not need to bring a printout to SSS.',
          'Once DOLE confirms, SSS approves the claim and emails you when the benefit is credited.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'If you have a pending illegal termination case and cannot get a Notice of Termination from your employer, DOLE will ask for a Certificate of Pending Case.',
          'False or fraudulent claims must be returned in full and can lead to liability under the Social Security Act.',
          'File only through the official My.SSS website. Never give your password or one-time PIN to anyone who offers to process your claim.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS unemployment benefit: sino ang qualified at paano mag-claim',
    description:
      'Sino ang puwedeng mag-claim ng SSS unemployment benefit kapag nawalan ng trabaho nang hindi kagustuhan, mga requirement at deadline, at ang online at DOLE certification na proseso, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS unemployment benefit ay tulong-pinansyal para sa mga covered na empleyado, kasama ang kasambahay, at mga OFW na nawalan ng trabaho nang hindi nila kagustuhan. Ifa-file mo ang claim online sa My.SSS, pagkatapos ay kukuha ka ng certification of involuntary separation mula sa DOLE. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang qualified',
        points: [
          'Hindi ka lampas 60 taong gulang nang mawalan ka ng trabaho. Para sa underground o surface mineworker, 50 ang limit; para sa racehorse jockey, 55.',
          'Nakapaghulog ka ng hindi bababa sa 36 na buwanang kontribusyon, at 12 dito ay sa loob ng 18 buwan bago ang buwan ng pagkawala mo ng trabaho.',
          'Hindi ka nakatanggap ng unemployment benefit sa loob ng 3 taon bago ang petsa ng pagkawala mo ng trabaho.',
          'Nawalan ka ng trabaho nang hindi mo kagustuhan (tingnan sa ibaba).',
        ],
      },
      {
        heading: 'Ano ang itinuturing na involuntary separation',
        points: [
          'Pagkatanggal dahil sa authorized causes sa ilalim ng Labor Code: paglalagay ng labor-saving device, redundancy, retrenchment o downsizing, pagsasara ng negosyo, o sakit na ipinagbabawal ng batas na magpatuloy sa trabaho o nakasasama sa iyo o sa mga katrabaho mo.',
          'Pagre-resign nang walang abiso dahil sa matinding pang-iinsulto, hindi makataong pagtrato, o krimeng ginawa ng employer o ng kinatawan nito laban sa iyo o sa malapit mong pamilya, o mga katulad na dahilan. Kailangan mo itong patunayan ng sapat na ebidensya kung hingin ng DOLE at SSS.',
          'Paghina ng ekonomiya, kalamidad na likas o gawa ng tao, at iba pang katulad na kaso na pagpapasyahan ng DOLE at SSS.',
          'Para sa mga OFW, ang DOLE sa pamamagitan ng POEA ang magpapasya ng dahilan ng pagkawala ng trabaho.',
          'Itinuturing na pagsasara lang kung nagsara ang lahat ng branch ng employer. Kung ang branch mo lang ang nagsara, retrenchment o redundancy ang dahilan.',
        ],
      },
      {
        heading: 'Sino ang hindi qualified',
        points: [
          'Mga natanggal dahil sa just causes, basta sinunod ng employer ang due process: malubhang misconduct, sadyang pagsuway, malubha at paulit-ulit na pagpapabaya sa tungkulin, pandaraya o sadyang paglabag sa tiwala, krimen o paglabag, o mga katulad na kaso gaya ng abandonment.',
          'Mga empleyadong naka-floating status na hindi pa natatanggal at naghihintay makabalik sa trabaho. Pero kung natapos ang employment contract mo nang hindi ka pinababalik, itinuturing kang involuntarily separated, mula sa simula ng floating status mo.',
          'Mga OFW na may kumpletong overseas contract pero hindi na-deploy o hindi nakaalis ng Pilipinas.',
        ],
      },
      {
        heading: 'Deadline at mga limitasyon',
        points: [
          'Mag-file sa loob ng 1 taon mula sa petsa ng pagkawala mo ng trabaho.',
          'Isang beses lang puwedeng mag-claim kada 3 taon.',
          'Kung qualified ka sa dalawa o higit pang benepisyo para sa parehong panahon, ang pinakamataas lang ang ibabayad.',
          'Puwedeng ibawas ng SSS ang benepisyo sa mga susunod mong benepisyo kung natanggap ka ulit sa trabaho sa loob ng benefit period o sa loob ng 2 buwan mula nang mawalan ka ng trabaho, kung ang kasong isinampa mo ay nauwi sa pagbabalik mo sa trabaho na may back wages o nagpatibay na tama ang pagtanggal sa iyo dahil sa just cause, o kung nagsabay ang mga benepisyo.',
        ],
      },
      {
        heading: 'Bago mag-apply',
        points: [
          'Rehistradong My.SSS account.',
          'UMID card na naka-enroll bilang ATM, o aprubadong disbursement account na naka-enroll sa Disbursement Account Enrollment Module (DAEM) ng My.SSS.',
        ],
      },
      {
        heading: 'Paano mag-claim',
        steps: [
          'Mag-log in sa My.SSS at i-click ang “Unemployment Benefit” sa ilalim ng Benefits tab.',
          'Piliin ang UMID-ATM card o disbursement account mo, ang employment category mo, ang petsa ng pagkawala ng trabaho, ang pangalan ng employer na rehistrado sa SSS, at ang DOLE, POLO o POEA office kung saan ka kukuha ng certification.',
          'Kumpirmahin ang mga deklarasyon. Ie-email sa iyo ng SSS ang Transaction Number at ang mga tagubilin para sa DOLE certification.',
          'Sa loob ng 30 araw, mag-apply ng Electronic Certification of Involuntary Separation: ang mga lokal na empleyado at kasambahay ay sa DOLE field o provincial office kung saan naroon ang employer; ang mga OFW ay sa POEA central office, One-Stop Service Center for OFWs, POEA regional center o satellite office, o sa POLO kung saan naroon ang foreign employer. Kapag lumampas ka sa 30 araw, makakansela ang claim at kailangan mong mag-file ulit; magpapadala ang SSS ng paalala sa email isang linggo bago nito.',
          'Dalhin ang Transaction Number, isang valid ID na may litrato at pirma mo, at ang Notice of Termination (o notaryadong Affidavit of Termination kung wala ka nito). Ang mga OFW ay magdala rin ng employment contract na beripikado ng POLO at/o patunay ng pagdating, gaya ng tatak ng Bureau of Immigration sa passport. Magdala ng Certificate of Pending Case o police report kung kailangan.',
          'Ise-certify ng DOLE ang pagkawala mo ng trabaho sa loob ng 3 araw ng trabaho mula nang matanggap ang kumpletong dokumento. Hindi mo na kailangang magdala ng printout sa SSS.',
          'Kapag nakumpirma na ng DOLE, aaprubahan ng SSS ang claim at ie-email ka kapag na-credit na ang benepisyo.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Kung may nakabinbin kang kaso ng illegal termination at hindi ka makakuha ng Notice of Termination mula sa employer, hihingan ka ng DOLE ng Certificate of Pending Case.',
          'Ang mga claim na mali o mapanlinlang ay kailangang ibalik nang buo at puwedeng magresulta sa pananagutan sa ilalim ng Social Security Act.',
          'Mag-file lamang sa opisyal na My.SSS website. Huwag ibigay ang password o one-time PIN mo sa sinumang nag-aalok na sila ang magpoproseso ng claim mo.',
        ],
      },
    ],
  },
};
