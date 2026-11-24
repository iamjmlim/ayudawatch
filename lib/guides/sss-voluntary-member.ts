import type { Guide } from './types';

// Source: https://www.sss.gov.ph/voluntary-member/ (read 2026-11-25). Every rule below is on that page.
export const sssVoluntaryMember: Guide = {
  slug: 'sss-voluntary-member',
  category: 'sss-gsis',
  checkedOn: '2026-11-25',
  sources: [{ name: 'SSS: Voluntary Member', url: 'https://www.sss.gov.ph/voluntary-member/' }],
  en: {
    title: 'SSS voluntary member: how to keep paying after you stop working',
    description: 'Who can pay SSS as a voluntary member, how to switch without forms, choosing your monthly salary credit, and why missed months cannot be paid later, from the official SSS page.',
    intro:
      'If you stopped working as an employee, self-employed member or OFW, you can keep paying SSS contributions as a voluntary member to keep your right to full benefits. Here is how it works, from the official SSS page.',
    sections: [
      {
        heading: 'Who can be a voluntary member',
        points: [
          'A member who was previously covered as an employee, self-employed member or OFW, with at least 1 posted contribution, and who no longer works or earns as one.',
          'Members aged 60 to 64 with 120 or more contributions can keep paying until 65 to get full benefits.',
          'Members aged 65 and up with fewer than 120 contributions can keep paying until they complete the 120 needed for a retirement pension.',
        ],
        note: 'Having an SS number alone is not enough: first-time payments as a voluntary member with no earlier contribution are void and will be refunded.',
      },
      {
        heading: 'How to switch',
        text: 'No form or document is needed. When you generate a Payment Reference Number (PRN) in My.SSS or the SSS Mobile App, choose “Voluntary Member” as your membership type. That changes your status and counts as your declaration that you no longer earn as an employee, self-employed member or OFW for those months.',
      },
      {
        heading: 'How much to pay',
        points: [
          'Your contribution follows the latest SSS schedule of contributions.',
          'If it is your first time as a voluntary member, you may choose any monthly salary credit (MSC) on the schedule, whatever your age or your last MSC.',
          'Below 55: you can change your MSC as often as you like, but not below the minimum.',
          '55 and older: you can raise your MSC only once a year, by one bracket. Lowering it has no limit.',
        ],
      },
      {
        heading: 'Missed months cannot be paid later',
        text: 'If you skip months after becoming a voluntary member, you can only pay going forward. The skipped months stay as gaps; paying for past months is not allowed. You can still get SSS benefits and loans as long as you meet each one’s conditions.',
      },
      {
        heading: 'Where to pay',
        points: ['SSS branches with tellers.', 'SSS-accredited banks, over the counter or through their website or app.', 'SSS non-bank collecting partners and their apps.', 'The SSS Mobile App.'],
      },
    ],
  },
  fil: {
    title: 'SSS voluntary member: paano magpatuloy sa paghulog kahit tumigil na sa trabaho',
    description: 'Sino ang puwedeng maghulog sa SSS bilang voluntary member, paano lumipat nang walang form, pagpili ng monthly salary credit, at bakit hindi mababayaran ang mga lumaktaw na buwan, mula sa opisyal na pahina ng SSS.',
    intro:
      'Kung tumigil ka na bilang empleyado, self-employed o OFW, puwede kang magpatuloy sa paghulog sa SSS bilang voluntary member para mapanatili ang karapatan mo sa buong benepisyo. Narito kung paano, mula sa opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Sino ang puwedeng maging voluntary member',
        points: [
          'Miyembrong dating sakop bilang empleyado, self-employed o OFW, na may hindi bababa sa 1 naka-post na hulog, at hindi na nagtatrabaho o kumikita bilang ganoon.',
          'Ang edad 60 hanggang 64 na may 120 o higit pang hulog ay puwedeng magpatuloy hanggang 65 para sa buong benepisyo.',
          'Ang edad 65 pataas na kulang sa 120 hulog ay puwedeng magpatuloy hanggang makumpleto ang 120 na kailangan para sa retirement pension.',
        ],
        note: 'Hindi sapat ang SS number lang: walang bisa at ire-refund ang unang hulog bilang voluntary member kung wala pang naunang hulog.',
      },
      {
        heading: 'Paano lumipat',
        text: 'Walang form o dokumentong kailangan. Kapag gumawa ka ng Payment Reference Number (PRN) sa My.SSS o SSS Mobile App, piliin ang “Voluntary Member” bilang membership type. Mababago nito ang status mo at ituturing itong deklarasyon na hindi ka kumikita bilang empleyado, self-employed o OFW sa mga buwang iyon.',
      },
      {
        heading: 'Magkano ang ihuhulog',
        points: [
          'Batay ang hulog sa pinakabagong schedule of contributions ng SSS.',
          'Kung unang beses kang voluntary member, puwede kang pumili ng anumang monthly salary credit (MSC) sa schedule, anuman ang edad o huling MSC mo.',
          'Wala pang 55: puwedeng baguhin ang MSC kahit ilang beses, pero hindi bababa sa minimum.',
          '55 pataas: puwedeng itaas ang MSC isang beses lang kada taon, nang isang bracket. Walang limitasyon ang pagbaba.',
        ],
      },
      {
        heading: 'Hindi na mababayaran ang mga lumaktaw na buwan',
        text: 'Kung lumaktaw ka ng buwan pagkatapos maging voluntary member, pasulong na lang ang puwedeng bayaran. Mananatiling puwang ang mga lumaktaw na buwan; hindi puwedeng bayaran ang nakaraang buwan. Makakakuha ka pa rin ng benepisyo at loan sa SSS basta pasok ka sa kondisyon ng bawat isa.',
      },
      {
        heading: 'Saan magbabayad',
        points: ['Sangay ng SSS na may teller.', 'Mga bangkong accredited ng SSS, sa counter o sa website o app nila.', 'Mga non-bank collecting partner ng SSS at mga app nila.', 'SSS Mobile App.'],
      },
    ],
  },
};
