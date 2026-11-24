import type { Guide } from './types';

// Sources (read 2026-11-25): DOLE Revised Guidelines on the Implementation of the 13th Month Pay Law
// (full text on ChanRobles; DOLE's own site was behind a bot check), and the Daily Tribune report on
// DOLE Labor Advisory No. 21, Series of 2026. Household-helper rules are left out on purpose: they
// are covered by a separate law that we have not verified here.
export const thirteenthMonthPay: Guide = {
  slug: 'thirteenth-month-pay',
  category: 'trabaho',
  checkedOn: '2026-11-25',
  sources: [
    {
      name: 'DOLE Revised Guidelines on the 13th Month Pay Law (PD 851), full text',
      url: 'https://www.chanrobles.com/revised13thmonthpayguidelines.htm',
    },
    {
      name: 'Daily Tribune: DOLE Labor Advisory No. 21, Series of 2026',
      url: 'https://tribune.net.ph/2026/11/10/dole-issues-13th-month-pay-rules',
    },
  ],
  en: {
    title: '13th month pay 2026: who gets it, how to compute it, and the December 24 deadline',
    description:
      'Who is entitled to 13th month pay, how to compute it (1/12 of your total basic pay), what counts as basic pay, pro-rated pay if you resigned, and the December 24, 2026 deadline.',
    intro:
      'Every rank-and-file employee in the private sector who worked at least one month this year is entitled to 13th month pay. For 2026, DOLE’s Labor Advisory No. 21 reminds employers to pay it on or before December 24, 2026, with no exemptions or deferments. Here is how it works.',
    sections: [
      {
        heading: 'How to compute it',
        text: '13th month pay = your total basic salary earned from January to December, divided by 12.',
        points: [
          'Example: if your basic pay was ₱18,000 every month for the whole year, your 13th month pay is ₱18,000 × 12 ÷ 12 = ₱18,000.',
          'Example: if you earned ₱18,000 a month but worked only from January to September, your 13th month pay is ₱18,000 × 9 ÷ 12 = ₱13,500.',
          'This is the minimum required by law. Your company can give more.',
        ],
      },
      {
        heading: 'What counts as basic pay',
        points: [
          'Basic pay includes what your employer pays you for the work you do.',
          'It does not include overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA), or the cash value of unused vacation and sick leave.',
          'Those items are included if your employment contract, union agreement, or company policy treats them as part of your basic pay.',
          'Piece-rate workers, and workers with a fixed wage plus commission, compute it on their total earnings (wage and commission).',
        ],
      },
      {
        heading: 'Who is entitled',
        points: [
          'All rank-and-file employees in the private sector who worked at least one month during the year, whatever their position, designation, employment status, or how they are paid.',
          'Rank-and-file means anyone who is not a manager with power to set policy or to hire, discipline or dismiss employees.',
          'Covered workers include piece-rate workers, workers paid a fixed wage plus commission, people with more than one employer (each private employer pays its share), private school teachers who worked at least a month, and employees on maternity leave who received salary differentials.',
        ],
      },
      {
        heading: 'If you resigned or were terminated',
        text: 'You are entitled to a pro-rated 13th month pay for the time you worked during the year, from the start of the year (or your start date) until you left. You can ask for it when your employment ends.',
      },
      {
        heading: 'When it must be paid',
        points: [
          'On or before December 24, 2026.',
          'Your employer may pay half before the school year opens and the other half by December 24.',
          'DOLE has said no exemptions or deferments will be granted to employers for 2026.',
        ],
      },
      {
        heading: 'Who is not covered by this law',
        points: [
          'Government employees, including those in government-owned and controlled corporations (except corporations run essentially as private subsidiaries).',
          'Employers who already pay a 13th month pay or its equivalent (such as a Christmas or mid-year bonus worth at least 1/12 of basic pay). If what they pay is less than 1/12, they must pay the difference.',
          'Workers paid purely by commission, boundary, or task, or a fixed amount for a specific job. This exclusion does not apply to piece-rate workers, who are covered.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          '13th month pay is separate from your regular wage: it is not used to compute overtime, premium pay, or SSS contributions.',
          'An employer cannot use it as a reason to reduce benefits you already receive.',
          'If you were not paid by December 24, you can raise it with DOLE through its official channels.',
        ],
      },
    ],
  },
  fil: {
    title: '13th month pay 2026: sino ang may karapatan, paano kuwentahin, at ang deadline na Disyembre 24',
    description:
      'Sino ang may karapatan sa 13th month pay, paano ito kuwentahin (1/12 ng kabuuang basic pay), ano ang kasama sa basic pay, pro-rated na bayad kung nag-resign ka, at ang deadline na Disyembre 24, 2026.',
    intro:
      'May karapatan sa 13th month pay ang bawat rank-and-file na empleyado sa pribadong sektor na nagtrabaho nang kahit isang buwan ngayong taon. Para sa 2026, ipinaalala ng Labor Advisory No. 21 ng DOLE sa mga employer na ibigay ito hanggang Disyembre 24, 2026, nang walang exemption o pagpapaliban. Ganito ito gumagana.',
    sections: [
      {
        heading: 'Paano kuwentahin',
        text: '13th month pay = kabuuang basic salary mo mula Enero hanggang Disyembre, hinati sa 12.',
        points: [
          'Halimbawa: kung ₱18,000 ang basic pay mo bawat buwan sa buong taon, ₱18,000 × 12 ÷ 12 = ₱18,000 ang 13th month pay mo.',
          'Halimbawa: kung ₱18,000 kada buwan pero Enero hanggang Setyembre ka lang nagtrabaho, ₱18,000 × 9 ÷ 12 = ₱13,500 ang 13th month pay mo.',
          'Ito ang pinakamababang itinakda ng batas. Puwedeng higit pa ang ibigay ng kompanya mo.',
        ],
      },
      {
        heading: 'Ano ang kasama sa basic pay',
        points: [
          'Kasama sa basic pay ang ibinabayad sa iyo ng employer para sa trabahong ginagawa mo.',
          'Hindi kasama ang overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA), o ang cash na katumbas ng hindi nagamit na vacation at sick leave.',
          'Kasama ang mga ito kung itinuturing na bahagi ng basic pay ng employment contract, union agreement o patakaran ng kompanya.',
          'Ang mga piece-rate worker at may fixed wage kasama ang commission ay kinukuwenta batay sa kabuuang kita (sahod at commission).',
        ],
      },
      {
        heading: 'Sino ang may karapatan',
        points: [
          'Lahat ng rank-and-file na empleyado sa pribadong sektor na nagtrabaho nang kahit isang buwan sa loob ng taon, anuman ang posisyon, designation, employment status o paraan ng pagbabayad.',
          'Ang rank-and-file ay sinumang hindi manager na may kapangyarihang gumawa ng patakaran o mag-hire, magdisiplina o magtanggal ng empleyado.',
          'Kasama ang mga piece-rate worker, may fixed wage at commission, may higit sa isang employer (bawat pribadong employer ay magbabayad ng bahagi nito), mga guro sa pribadong paaralan na nagtrabaho nang kahit isang buwan, at mga naka-maternity leave na tumanggap ng salary differential.',
        ],
      },
      {
        heading: 'Kung nag-resign ka o natanggal',
        text: 'May karapatan ka sa pro-rated na 13th month pay para sa panahong nagtrabaho ka sa loob ng taon, mula simula ng taon (o simula ng trabaho mo) hanggang sa pag-alis mo. Puwede mo itong hingin pagkatapos ng iyong trabaho.',
      },
      {
        heading: 'Kailan ito dapat ibigay',
        points: [
          'Hanggang Disyembre 24, 2026.',
          'Puwedeng ibigay ng employer ang kalahati bago magbukas ang klase at ang kalahati hanggang Disyembre 24.',
          'Sinabi ng DOLE na walang exemption o pagpapaliban na ibibigay sa mga employer para sa 2026.',
        ],
      },
      {
        heading: 'Sino ang hindi sakop ng batas na ito',
        points: [
          'Mga empleyado ng gobyerno, kasama ang mga government-owned and controlled corporation (maliban sa mga korporasyong pinapatakbo na parang pribadong subsidiary).',
          'Mga employer na nagbibigay na ng 13th month pay o katumbas nito (gaya ng Christmas o mid-year bonus na hindi bababa sa 1/12 ng basic pay). Kung kulang sa 1/12 ang ibinibigay nila, kailangan nilang bayaran ang kulang.',
          'Mga manggagawang bayad lang sa commission, boundary o task, o fixed na halaga para sa isang partikular na trabaho. Hindi ito sakop ng mga piece-rate worker, na may karapatan.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Hiwalay ang 13th month pay sa regular na sahod: hindi ito ginagamit sa pagkuwenta ng overtime, premium pay o kontribusyon sa SSS.',
          'Hindi ito puwedeng gamiting dahilan ng employer para bawasan ang mga benepisyong natatanggap mo na.',
          'Kung hindi ka nabayaran hanggang Disyembre 24, puwede mo itong idulog sa DOLE sa mga opisyal nitong channel.',
        ],
      },
    ],
  },
};
