import type { Guide } from './types';

// Source: https://www.philhealth.gov.ph/members/senior/ (read 2026-11-24).
export const philhealthSeniorCitizens: Guide = {
  slug: 'philhealth-senior-citizens',
  category: 'philhealth',
  checkedOn: '2026-11-24',
  sources: [
    { name: 'PhilHealth: Senior Citizens', url: 'https://www.philhealth.gov.ph/members/senior/' },
    { name: 'PhilHealth Member Registration Form (PMRF)', url: 'https://www.philhealth.gov.ph/downloads/membership/pmrf_012020.pdf' },
  ],
  en: {
    title: 'PhilHealth for senior citizens: who is covered and how to register',
    description:
      'Which senior citizens are covered by PhilHealth, who pays the premium, how to register through OSCA or a PhilHealth office, and how to use it in the hospital, based on the official PhilHealth page.',
    intro:
      'Filipino senior citizens who are not yet covered by PhilHealth can be enrolled as senior citizen members. Their premiums are paid from Sin Tax Law funds, not by the member. Here is what the official PhilHealth page says about who qualifies and how to register.',
    sections: [
      {
        heading: 'Who qualifies',
        points: [
          'Filipino citizens living in the Philippines, aged 60 or older, who are not covered under any other PhilHealth membership category.',
          'Qualified dependents of senior citizen members who are senior citizens themselves.',
          'Qualified dependents of members in other categories, with or without coverage, who are senior citizens themselves.',
        ],
        note: 'Senior citizens who still work or have a regular source of income keep paying their premiums under their current membership category.',
      },
      {
        heading: 'Who pays the premium',
        text: 'Premiums for members enrolled as senior citizens come from the proceeds of Republic Act No. 10351, known as the Sin Tax Law.',
      },
      {
        heading: 'Option 1: register through OSCA',
        steps: [
          'Fill out one copy of the PhilHealth Member Registration Form (PMRF).',
          'Submit it to the Office for Senior Citizens Affairs (OSCA) in the city or municipality where the senior citizen lives.',
          'Wait for your Member Data Record and PhilHealth ID card, which PhilHealth releases through OSCA.',
        ],
      },
      {
        heading: 'Option 2: register at a PhilHealth office',
        steps: [
          'Fill out one copy of the PhilHealth Member Registration Form (PMRF).',
          'Attach one 1x1 photo taken within the last six months.',
          'Bring your Senior Citizen ID from the OSCA where you live, or a valid government-issued ID.',
          'Submit the form at a PhilHealth Local Health Insurance Office (LHIO).',
          'Wait for your Member Data Record and PhilHealth ID card.',
        ],
      },
      {
        heading: 'Using PhilHealth in the hospital',
        points: [
          'In hospitals with the PhilHealth HCI Portal, show your Senior Citizen ID, your Member Data Record, or any accepted proof of identity and age. The hospital prints a PhilHealth Benefit Eligibility Form (PBEF). If it says “YES”, you are entitled to benefits and they are deducted from your bill automatically.',
          'If the hospital has no HCI Portal, if the PBEF says “NO”, or if you were not enrolled before discharge, attach a filled-out PMRF and proof that you are a senior citizen (such as your Senior Citizen ID) to the usual claim documents.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'Download the PMRF only from the official PhilHealth website (linked above).',
          'PhilHealth registration is done through OSCA or PhilHealth offices. Never pay anyone who offers to register you for a fee.',
        ],
      },
    ],
  },
  fil: {
    title: 'PhilHealth para sa senior citizen: sino ang sakop at paano magparehistro',
    description:
      'Aling mga senior citizen ang sakop ng PhilHealth, sino ang nagbabayad ng premium, paano magparehistro sa OSCA o sa PhilHealth office, at paano ito gamitin sa ospital, batay sa opisyal na pahina ng PhilHealth.',
    intro:
      'Ang mga senior citizen na Pilipino na hindi pa sakop ng PhilHealth ay puwedeng i-enroll bilang senior citizen member. Ang premium nila ay binabayaran mula sa pondo ng Sin Tax Law, hindi ng miyembro. Narito ang sinasabi ng opisyal na pahina ng PhilHealth tungkol sa kung sino ang qualified at paano magparehistro.',
    sections: [
      {
        heading: 'Sino ang qualified',
        points: [
          'Mga Pilipinong nakatira sa Pilipinas, 60 taong gulang pataas, na hindi sakop ng ibang membership category ng PhilHealth.',
          'Mga qualified na dependent ng senior citizen member na senior citizen din.',
          'Mga qualified na dependent ng miyembro sa ibang category, may coverage man o wala, na senior citizen din.',
        ],
        note: 'Ang mga senior citizen na nagtatrabaho pa o may regular na pinagkakakitaan ay patuloy na magbabayad ng premium sa kasalukuyan nilang membership category.',
      },
      {
        heading: 'Sino ang nagbabayad ng premium',
        text: 'Ang premium ng mga naka-enroll bilang senior citizen ay galing sa kita ng Republic Act No. 10351, na kilala bilang Sin Tax Law.',
      },
      {
        heading: 'Paraan 1: magparehistro sa OSCA',
        steps: [
          'Sagutan ang isang kopya ng PhilHealth Member Registration Form (PMRF).',
          'Isumite ito sa Office for Senior Citizens Affairs (OSCA) sa lungsod o munisipyo kung saan nakatira ang senior citizen.',
          'Hintayin ang Member Data Record at PhilHealth ID card, na ibibigay ng PhilHealth sa pamamagitan ng OSCA.',
        ],
      },
      {
        heading: 'Paraan 2: magparehistro sa PhilHealth office',
        steps: [
          'Sagutan ang isang kopya ng PhilHealth Member Registration Form (PMRF).',
          'Maglakip ng isang 1x1 na litrato na kinunan sa loob ng nakaraang anim na buwan.',
          'Dalhin ang Senior Citizen ID mula sa OSCA kung saan ka nakatira, o isang valid na government-issued ID.',
          'Isumite ang form sa PhilHealth Local Health Insurance Office (LHIO).',
          'Hintayin ang Member Data Record at PhilHealth ID card.',
        ],
      },
      {
        heading: 'Paggamit ng PhilHealth sa ospital',
        points: [
          'Sa mga ospital na may PhilHealth HCI Portal, ipakita ang Senior Citizen ID, Member Data Record, o anumang tinatanggap na patunay ng pagkakakilanlan at edad. Magpi-print ang ospital ng PhilHealth Benefit Eligibility Form (PBEF). Kung “YES” ang nakasulat, may karapatan ka sa benepisyo at awtomatiko itong ibabawas sa bill mo.',
          'Kung walang HCI Portal ang ospital, kung “NO” ang nakasulat sa PBEF, o kung hindi ka naka-enroll bago ma-discharge, ilakip ang nasagutang PMRF at patunay na senior citizen ka (gaya ng Senior Citizen ID) sa karaniwang claim documents.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'I-download lamang ang PMRF mula sa opisyal na website ng PhilHealth (naka-link sa itaas).',
          'Ang pagpaparehistro sa PhilHealth ay sa OSCA o sa mga PhilHealth office. Huwag magbayad sa sinumang nag-aalok na irerehistro ka kapalit ng bayad.',
        ],
      },
    ],
  },
};
