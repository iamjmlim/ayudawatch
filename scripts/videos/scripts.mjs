// Short vertical videos for TikTok, Facebook Reels and YouTube Shorts.
// Every number here is taken from the site's verified content (calculator explainers,
// holiday list from Proclamation No. 1427, SSS maternity guide); nothing is new.
//
// Slide kinds:
//   hook   { kicker, title, sub? }        opening slide, big title
//   big    { title, value, sub? }         one big number or formula
//   list   { title, items: [main, sub?] } up to 4 rows
//   cta    { title, sub }                 closing slide with the site address
// `secs` sets how long a slide stays on screen.

export const VIDEOS = [
  {
    slug: 'thirteenth-month',
    link: 'ayudawatch.com/fil/calculators/thirteenth-month',
    caption:
      'Magkano ang 13th month pay mo? 💸 Formula: kabuuang basic pay mula Enero–Disyembre ÷ 12. Deadline: Disyembre 24, 2026. Libreng calculator sa ayudawatch.com #13thmonthpay #13thmonth #sahod #trabaho #DOLE',
    slides: [
      { kind: 'hook', kicker: '13TH MONTH PAY 2026', title: 'Magkano ang 13th month mo?', sub: 'Deadline: Disyembre 24', secs: 3 },
      { kind: 'big', title: 'Ang formula', value: 'Kabuuang basic pay (Enero–Disyembre) ÷ 12', secs: 4 },
      {
        kind: 'list',
        title: 'Mga halimbawa',
        items: [
          ['₱18,000/buwan, buong taon', '= ₱18,000'],
          ['₱18,000/buwan, nag-resign ng Setyembre', '9 buwan → ₱13,500'],
          ['₱20,000/buwan, natanggap ng Oktubre', '3 buwan → ₱5,000'],
        ],
        secs: 5,
      },
      {
        kind: 'list',
        title: 'Dapat mong malaman',
        items: [
          ['Walang tax hanggang ₱90,000', 'kasama ang ibang bonus (TRAIN law)'],
          ['Hindi kasama ang OT at holiday pay', 'maliban kung nasa kontrata'],
          ['Nag-resign? May pro-rated ka pa rin', ''],
        ],
        secs: 5,
      },
      { kind: 'cta', title: 'Kuwentahin ang sa’yo', sub: 'Libreng 13th month calculator', secs: 4 },
    ],
  },
  {
    slug: 'long-weekends-2027',
    link: 'ayudawatch.com/fil/holidays/2027',
    caption:
      '7 long weekend sa 2027! 🗓️ Mula sa opisyal na Proclamation No. 1427. Kumpletong listahan at holiday pay rates sa ayudawatch.com #longweekend #holidays2027 #bakasyon #Pilipinas',
    slides: [
      { kind: 'hook', kicker: 'HOLIDAYS 2027', title: '7 long weekend sa 2027', sub: 'I-plan na ang bakasyon!', secs: 3 },
      {
        kind: 'list',
        title: 'Unang kalahati ng taon',
        items: [
          ['Dis 30, 2026 – Ene 3', '5 araw · Rizal Day at Bagong Taon'],
          ['Marso 25–28', '4 araw · Semana Santa'],
          ['Abril 9–11', '3 araw · Araw ng Kagitingan'],
        ],
        secs: 5,
      },
      {
        kind: 'list',
        title: 'Ikalawang kalahati',
        items: [
          ['Agosto 28–30', '3 araw · Araw ng mga Bayani'],
          ['Okt 30 – Nob 2', '4 araw · Undas'],
          ['Disyembre 24–26', '3 araw · Pasko'],
          ['Dis 30, 2027 – Ene 2, 2028', '4 araw · Rizal Day at Bagong Taon'],
        ],
        secs: 6,
      },
      { kind: 'big', title: 'Opisyal ang mga petsa', value: 'Proclamation No. 1427, s. 2026', sub: 'Kasama ang regular holiday, special non-working day at weekend', secs: 4 },
      { kind: 'cta', title: 'Kumpletong listahan', sub: 'At ang holiday pay rates', secs: 4 },
    ],
  },
  {
    slug: 'sss-maternity',
    link: 'ayudawatch.com/fil/calculators/sss-maternity',
    caption:
      'SSS Maternity Benefit 2026: hanggang ₱70,000 para sa 105 araw 🤱 Sino ang qualified at paano kinukuwenta. Libreng calculator sa ayudawatch.com #SSS #maternitybenefit #nanay #SSSmaternity',
    slides: [
      { kind: 'hook', kicker: 'SSS MATERNITY 2026', title: 'Hanggang ₱70,000 ang maternity mo', sub: 'Paano kinukuwenta?', secs: 3 },
      {
        kind: 'list',
        title: 'Pinakamataas na benepisyo',
        items: [
          ['Live birth · 105 araw', 'hanggang ₱70,000'],
          ['Solo parent · 120 araw', 'hanggang ₱80,000'],
          ['Miscarriage / ETP · 60 araw', 'hanggang ₱40,000'],
        ],
        secs: 5,
      },
      {
        kind: 'list',
        title: 'Sino ang qualified',
        items: [
          ['Kahit 3 buwanang hulog', 'sa 12 buwan bago ang semester ng panganganak'],
          ['Para sa bawat pagbubuntis', 'anuman ang civil status'],
          ['Abisuhan ang employer o SSS', 'tungkol sa pagbubuntis mo'],
        ],
        secs: 5,
      },
      { kind: 'big', title: 'Halimbawa', value: '₱96,000 ÷ 180 × 105 = ₱56,000', sub: 'Kabuuan ng 6 na pinakamataas na monthly salary credit ÷ 180, beses 105 araw', secs: 5 },
      { kind: 'cta', title: 'Kuwentahin ang sa’yo', sub: 'Libreng SSS maternity calculator', secs: 4 },
    ],
  },
];
