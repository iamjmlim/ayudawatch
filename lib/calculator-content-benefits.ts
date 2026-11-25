import type { CalcExplainer } from './calculator-content';

// Explainers for the SSS, contribution and MP2 calculators. Facts come from the official pages behind
// lib/contributions.ts (SSS, PhilHealth, Pag-IBIG schedules) and the SSS retirement, maternity and
// sickness guides and the Pag-IBIG MP2 guide. Examples are computed with the site's own code.

type Slug = 'contributions' | 'sss-pension' | 'sss-maternity' | 'sss-sickness' | 'pagibig-mp2';

export const BENEFIT_CONTENT: Record<Slug, { en: CalcExplainer; fil: CalcExplainer }> = {
  contributions: {
    en: {
      sections: [
        {
          heading: 'How the 2026 contributions are computed',
          points: [
            'SSS: 15% of your monthly salary credit (MSC), from ₱5,000 to ₱35,000. Employees pay 5% and employers pay 10% plus the employees’ compensation (EC) premium of ₱10 (MSC below ₱15,000) or ₱30. The part of the MSC above ₱20,000 goes to your MPF (WISP) savings.',
            'Self-employed, voluntary and OFW members pay the full 15% themselves.',
            'PhilHealth: 5% of your monthly basic salary, with a ₱10,000 floor and a ₱100,000 ceiling, shared equally by you and your employer.',
            'Pag-IBIG: 2% from you and 2% from your employer, on up to ₱10,000 of monthly salary, so at most ₱200 each.',
          ],
        },
        {
          heading: 'Examples: employee’s share per month',
          points: [
            '₱15,000 salary: SSS ₱750, PhilHealth ₱375, Pag-IBIG ₱200. Total ₱1,325.',
            '₱25,000 salary: SSS ₱1,250, PhilHealth ₱625, Pag-IBIG ₱200. Total ₱2,075.',
            '₱40,000 salary: SSS ₱1,750 (MSC capped at ₱35,000), PhilHealth ₱1,000, Pag-IBIG ₱200. Total ₱2,950.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much is the SSS contribution in 2026?',
          a: 'The current schedule, effective January 2025, is 15% of your monthly salary credit. For employees that is 5% from you and 10% from your employer, plus a small EC premium paid by the employer.',
        },
        {
          q: 'What is the maximum SSS contribution?',
          a: 'The monthly salary credit is capped at ₱35,000, so the most an employee pays is ₱1,750 a month.',
        },
        {
          q: 'How much is the PhilHealth contribution?',
          a: '5% of your monthly basic salary, between a ₱10,000 floor and a ₱100,000 ceiling. Employees and employers each pay half, so an employee pays from ₱250 to ₱2,500 a month.',
        },
        {
          q: 'How much is the Pag-IBIG contribution?',
          a: 'Employees and employers each pay 2% of up to ₱10,000 of monthly salary, so ₱200 each at most. Members may always save more.',
        },
        {
          q: 'How much do voluntary SSS members pay?',
          a: 'Voluntary members pay the full 15% of the monthly salary credit they choose. At the ₱5,000 minimum, that is ₱750 a month.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang kontribusyon sa 2026',
          points: [
            'SSS: 15% ng monthly salary credit (MSC), mula ₱5,000 hanggang ₱35,000. 5% ang bahagi ng empleyado at 10% ang employer dagdag ang employees’ compensation (EC) premium na ₱10 (MSC na mababa sa ₱15,000) o ₱30. Ang bahagi ng MSC na lampas sa ₱20,000 ay napupunta sa MPF (WISP) na ipon mo.',
            'Ang self-employed, voluntary at OFW ay nagbabayad ng buong 15%.',
            'PhilHealth: 5% ng buwanang basic salary, na may ₱10,000 na pinakamababa at ₱100,000 na pinakamataas, hati ang empleyado at employer.',
            'Pag-IBIG: 2% mula sa iyo at 2% mula sa employer, sa hanggang ₱10,000 ng buwanang sahod, kaya hanggang ₱200 bawat isa.',
          ],
        },
        {
          heading: 'Mga halimbawa: bahagi ng empleyado kada buwan',
          points: [
            '₱15,000 na sahod: SSS ₱750, PhilHealth ₱375, Pag-IBIG ₱200. Kabuuan ₱1,325.',
            '₱25,000 na sahod: SSS ₱1,250, PhilHealth ₱625, Pag-IBIG ₱200. Kabuuan ₱2,075.',
            '₱40,000 na sahod: SSS ₱1,750 (MSC hanggang ₱35,000 lang), PhilHealth ₱1,000, Pag-IBIG ₱200. Kabuuan ₱2,950.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Magkano ang SSS contribution sa 2026?',
          a: 'Ang kasalukuyang schedule, epektibo Enero 2025, ay 15% ng monthly salary credit. Para sa empleyado, 5% mula sa iyo at 10% mula sa employer, dagdag ang maliit na EC premium na binabayaran ng employer.',
        },
        {
          q: 'Magkano ang pinakamataas na SSS contribution?',
          a: 'Hanggang ₱35,000 lang ang monthly salary credit, kaya ₱1,750 kada buwan ang pinakamalaking babayaran ng empleyado.',
        },
        {
          q: 'Magkano ang PhilHealth contribution?',
          a: '5% ng buwanang basic salary, sa pagitan ng ₱10,000 at ₱100,000. Hati ang empleyado at employer, kaya ₱250 hanggang ₱2,500 kada buwan ang bahagi ng empleyado.',
        },
        {
          q: 'Magkano ang Pag-IBIG contribution?',
          a: 'Ang empleyado at employer ay parehong nagbabayad ng 2% ng hanggang ₱10,000 na buwanang sahod, kaya hanggang ₱200 bawat isa. Puwede laging mag-ipon nang higit pa.',
        },
        {
          q: 'Magkano ang binabayaran ng voluntary SSS member?',
          a: 'Buong 15% ng monthly salary credit na pinili nila. Sa pinakamababang ₱5,000, ₱750 kada buwan iyon.',
        },
      ],
    },
  },

  'sss-pension': {
    en: {
      sections: [
        {
          heading: 'How the SSS retirement pension is computed',
          text: 'Your monthly pension is the highest of these three:',
          points: [
            '₱300 + 20% of your average monthly salary credit (AMSC) + 2% of your AMSC for every credited year of service beyond 10.',
            '40% of your AMSC.',
            'The minimum pension: ₱1,200 with at least 10 credited years of service, or ₱2,400 with at least 20.',
          ],
          note: 'On top of that: an additional ₱1,000 a month, and the Pension Reform Program increases of 10% in September 2025 and June 2026 (compounded), with another scheduled for September 2027.',
        },
        {
          heading: 'Examples',
          points: [
            'AMSC ₱20,000, 25 credited years: ₱300 + ₱4,000 + ₱6,000 = ₱10,300 (higher than 40%, ₱8,000). With the two increases so far, about ₱12,463, plus ₱1,000 = about ₱13,463 a month.',
            'AMSC ₱10,000, 12 credited years: ₱300 + ₱2,000 + ₱400 = ₱2,700, but 40% of AMSC is ₱4,000, so the pension is ₱4,000. With the increases, about ₱4,840, plus ₱1,000 = about ₱5,840.',
          ],
          note: 'Estimates only. SSS computes your exact pension from your records; confirm with SSS.',
        },
      ],
      faqs: [
        {
          q: 'How many contributions do I need for an SSS pension?',
          a: 'At least 120 monthly contributions before the semester of your retirement. With fewer, you get a lump sum instead, or you can keep paying as a voluntary member until you reach 120.',
        },
        {
          q: 'At what age can I get my SSS pension?',
          a: 'At 60 if you are no longer working (optional retirement), or at 65 whether or not you are still working (technical retirement). Underground and surface mineworkers can retire earlier.',
        },
        {
          q: 'How much did SSS pensions increase?',
          a: 'Under the SSS Pension Reform Program, retirement and disability pensions rise 10% a year from 2025 to 2027: September 2025, June 2026, and the last one scheduled for September 2027.',
        },
        {
          q: 'Do SSS pensioners get a 13th month pension?',
          a: 'Yes, every December.',
        },
        {
          q: 'Can I get my pension in advance?',
          a: 'You can choose to receive your first 18 monthly pensions in advance as a lump sum, discounted at a rate set by SSS. You must choose this when you first file.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang SSS retirement pension',
          text: 'Ang buwanang pension mo ay ang pinakamataas sa tatlong ito:',
          points: [
            '₱300 + 20% ng average monthly salary credit (AMSC) + 2% ng AMSC sa bawat credited year of service na lampas sa 10.',
            '40% ng AMSC.',
            'Ang pinakamababang pension: ₱1,200 kung may hindi bababa sa 10 credited years of service, o ₱2,400 kung may hindi bababa sa 20.',
          ],
          note: 'Dagdag pa: ₱1,000 na karagdagang benepisyo kada buwan, at ang dagdag ng Pension Reform Program na 10% noong Setyembre 2025 at Hunyo 2026 (compounded), at isa pang nakatakda sa Setyembre 2027.',
        },
        {
          heading: 'Mga halimbawa',
          points: [
            'AMSC ₱20,000, 25 credited years: ₱300 + ₱4,000 + ₱6,000 = ₱10,300 (mas mataas sa 40%, ₱8,000). Kasama ang dalawang dagdag, mga ₱12,463, at ₱1,000 = mga ₱13,463 kada buwan.',
            'AMSC ₱10,000, 12 credited years: ₱300 + ₱2,000 + ₱400 = ₱2,700, pero ₱4,000 ang 40% ng AMSC, kaya ₱4,000 ang pension. Kasama ang mga dagdag, mga ₱4,840, at ₱1,000 = mga ₱5,840.',
          ],
          note: 'Tantiya lang. Kinukuwenta ng SSS ang eksaktong pension mula sa rekord mo; kumpirmahin sa SSS.',
        },
      ],
      faqs: [
        {
          q: 'Ilang hulog ang kailangan para sa SSS pension?',
          a: 'Hindi bababa sa 120 buwanang hulog bago ang semester ng pagreretiro mo. Kung kulang, lump sum ang matatanggap mo, o puwede kang magpatuloy bilang voluntary member hanggang umabot sa 120.',
        },
        {
          q: 'Sa anong edad puwedeng makuha ang SSS pension?',
          a: 'Sa 60 kung hindi ka na nagtatrabaho (optional retirement), o sa 65 nagtatrabaho man o hindi (technical retirement). Mas maaga para sa mga underground at surface mineworker.',
        },
        {
          q: 'Magkano ang itinaas ng SSS pension?',
          a: 'Sa SSS Pension Reform Program, tumataas nang 10% kada taon ang retirement at disability pension mula 2025 hanggang 2027: Setyembre 2025, Hunyo 2026, at ang huli ay nakatakda sa Setyembre 2027.',
        },
        {
          q: 'May 13th month pension ba ang SSS pensioner?',
          a: 'Oo, tuwing Disyembre.',
        },
        {
          q: 'Puwede bang makuha nang maaga ang pension?',
          a: 'Puwede mong piliing tanggapin ang unang 18 buwanang pension nang maaga bilang lump sum, na may discount ayon sa rate ng SSS. Dapat itong piliin sa unang pag-file.',
        },
      ],
    },
  },

  'sss-maternity': {
    en: {
      sections: [
        {
          heading: 'How the SSS maternity benefit is computed',
          steps: [
            'Find the semester of contingency: the two quarters ending in the quarter of your delivery. Contributions in or after it do not count.',
            'Take the 12 months before that semester and add up the 6 highest monthly salary credits (each counted up to ₱20,000).',
            'Divide by 180: that is your average daily salary credit (ADSC), your daily allowance.',
            'Multiply by 105 days (live birth), 120 days (qualified solo parent) or 60 days (miscarriage or emergency termination of pregnancy).',
          ],
        },
        {
          heading: 'Examples',
          points: [
            '6 highest MSCs total ₱96,000: ₱96,000 ÷ 180 = ₱533.33 a day × 105 = ₱56,000.',
            'Maximum (6 MSCs of ₱20,000): ₱666.67 a day, so ₱70,000 for 105 days, ₱80,000 for 120 days, ₱40,000 for 60 days.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much is the SSS maternity benefit in 2026?',
          a: 'Up to ₱70,000 for a live birth (105 days), ₱80,000 for a qualified solo parent (120 days) and ₱40,000 for a miscarriage or emergency termination of pregnancy (60 days). Your amount depends on your monthly salary credits.',
        },
        {
          q: 'How many contributions do I need?',
          a: 'At least 3 monthly contributions in the 12 months before the semester of your delivery, miscarriage or emergency termination of pregnancy.',
        },
        {
          q: 'Do employed mothers get full pay?',
          a: 'Yes, in most cases: the SSS benefit plus a salary differential from the employer. Some employers are exempt, such as distressed establishments, small retail or service businesses with 10 workers or fewer, and micro-businesses.',
        },
        {
          q: 'Is the benefit higher for twins?',
          a: 'No. Only one benefit is paid per delivery, even for twins or more.',
        },
        {
          q: 'How long do I have to file?',
          a: 'Up to 10 years after the delivery, miscarriage or emergency termination of pregnancy.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang SSS maternity benefit',
          steps: [
            'Hanapin ang semester of contingency: ang dalawang quarter na nagtatapos sa quarter ng panganganak mo. Hindi binibilang ang hulog sa loob o pagkatapos nito.',
            'Kunin ang 12 buwan bago ang semester na iyon at pagsamahin ang 6 na pinakamataas na monthly salary credit (bawat isa hanggang ₱20,000).',
            'Hatiin sa 180: iyan ang average daily salary credit (ADSC), ang arawang allowance mo.',
            'I-multiply sa 105 araw (live birth), 120 araw (qualified solo parent) o 60 araw (miscarriage o emergency termination of pregnancy).',
          ],
        },
        {
          heading: 'Mga halimbawa',
          points: [
            'Kabuuang ₱96,000 ang 6 na pinakamataas na MSC: ₱96,000 ÷ 180 = ₱533.33 kada araw × 105 = ₱56,000.',
            'Pinakamataas (6 na MSC na ₱20,000): ₱666.67 kada araw, kaya ₱70,000 sa 105 araw, ₱80,000 sa 120 araw, ₱40,000 sa 60 araw.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Magkano ang SSS maternity benefit sa 2026?',
          a: 'Hanggang ₱70,000 sa live birth (105 araw), ₱80,000 sa qualified solo parent (120 araw) at ₱40,000 sa miscarriage o emergency termination of pregnancy (60 araw). Nakadepende ang halaga sa monthly salary credit mo.',
        },
        {
          q: 'Ilang hulog ang kailangan?',
          a: 'Hindi bababa sa 3 buwanang hulog sa loob ng 12 buwan bago ang semester ng panganganak, miscarriage o emergency termination of pregnancy.',
        },
        {
          q: 'Buo ba ang sahod ng nanay na empleyado?',
          a: 'Oo, sa karamihan ng kaso: ang SSS benefit dagdag ang salary differential mula sa employer. May mga exempted na employer, gaya ng distressed establishment, maliit na retail o service na negosyong may 10 manggagawa pababa, at micro-business.',
        },
        {
          q: 'Mas mataas ba ang benepisyo kung kambal?',
          a: 'Hindi. Isang benepisyo lang kada panganganak, kahit kambal o higit pa.',
        },
        {
          q: 'Hanggang kailan puwedeng mag-file?',
          a: 'Hanggang 10 taon pagkatapos ng panganganak, miscarriage o emergency termination of pregnancy.',
        },
      ],
    },
  },

  'sss-sickness': {
    en: {
      sections: [
        {
          heading: 'How the SSS sickness benefit is computed',
          steps: [
            'Find the semester of contingency and take the 12 months before it.',
            'Add up the 6 highest monthly salary credits in those 12 months (each counted up to ₱20,000) and divide by 180.',
            'Your daily sickness allowance is 90% of that.',
            'Multiply by the number of days SSS approves.',
          ],
        },
        {
          heading: 'Example',
          points: [
            '6 MSCs of ₱20,000: ₱120,000 ÷ 180 = ₱666.67 × 90% = ₱600 a day.',
            'For 7 approved days: ₱600 × 7 = ₱4,200.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Who qualifies for the SSS sickness benefit?',
          a: 'Members confined in a hospital or at home for at least 4 days, with at least 3 monthly contributions in the 12 months before the semester of the sickness. Employed members must first use up their paid company sick leave.',
        },
        {
          q: 'How many days can I claim?',
          a: 'Up to 120 days in a calendar year, and up to 240 days for the same illness. Unused days do not carry over.',
        },
        {
          q: 'What is the deadline to notify?',
          a: 'If employed and confined at home, tell your employer within 5 calendar days. Late notice can reduce or cancel your claim.',
        },
        {
          q: 'Can I get sickness and maternity benefits for the same days?',
          a: 'No. You cannot receive the sickness benefit for the same days you receive the maternity benefit.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano kinukuwenta ang SSS sickness benefit',
          steps: [
            'Hanapin ang semester of contingency at kunin ang 12 buwan bago nito.',
            'Pagsamahin ang 6 na pinakamataas na monthly salary credit sa 12 buwang iyon (bawat isa hanggang ₱20,000) at hatiin sa 180.',
            '90% niyon ang arawang sickness allowance mo.',
            'I-multiply sa bilang ng araw na aaprubahan ng SSS.',
          ],
        },
        {
          heading: 'Halimbawa',
          points: ['6 na MSC na ₱20,000: ₱120,000 ÷ 180 = ₱666.67 × 90% = ₱600 kada araw.', 'Sa 7 araw na naaprubahan: ₱600 × 7 = ₱4,200.'],
        },
      ],
      faqs: [
        {
          q: 'Sino ang qualified sa SSS sickness benefit?',
          a: 'Mga miyembrong naka-confine sa ospital o sa bahay nang hindi bababa sa 4 na araw, na may hindi bababa sa 3 buwanang hulog sa loob ng 12 buwan bago ang semester ng pagkakasakit. Kailangang ubusin muna ng empleyado ang bayad na sick leave sa kompanya.',
        },
        {
          q: 'Ilang araw ang puwedeng i-claim?',
          a: 'Hanggang 120 araw sa isang taon, at hanggang 240 araw para sa iisang sakit. Hindi nadadala sa susunod na taon ang hindi nagamit na araw.',
        },
        {
          q: 'Kailan ang deadline ng pag-abiso?',
          a: 'Kung empleyado at naka-confine sa bahay, sabihan ang employer sa loob ng 5 araw. Puwedeng mabawasan o hindi maaprubahan ang claim kung huli ang abiso.',
        },
        {
          q: 'Puwede bang sabay ang sickness at maternity benefit sa parehong araw?',
          a: 'Hindi. Hindi puwedeng tumanggap ng sickness benefit sa parehong mga araw na tumatanggap ka ng maternity benefit.',
        },
      ],
    },
  },

  'pagibig-mp2': {
    en: {
      sections: [
        {
          heading: 'How MP2 savings grow',
          points: [
            'You save at least ₱500 per remittance, monthly or as one lump sum, for 5 years.',
            'Pag-IBIG declares a dividend rate every year: 7.12% for 2025, 7.10% for 2024, 7.05% for 2023.',
            'Compounded: dividends are added to your savings each year and paid with everything at maturity. Annual payout: dividends go to your bank account every year.',
          ],
        },
        {
          heading: 'Examples (at 7.12% every year, compounded)',
          points: [
            '₱500 a month for 5 years: ₱30,000 saved grows to about ₱35,921.',
            '₱50,000 one-time: grows to about ₱70,522 after 5 years.',
          ],
          note: 'Estimates only: future rates depend on Pag-IBIG’s performance and may be higher or lower.',
        },
      ],
      faqs: [
        {
          q: 'What is the MP2 dividend rate for 2025?',
          a: '7.12%, the rate Pag-IBIG declared for 2025. Earlier rates were 7.10% (2024), 7.05% (2023), 7.03% (2022) and 6.00% (2021).',
        },
        {
          q: 'What is the minimum MP2 savings?',
          a: '₱500 per remittance. You can also pay one lump sum for the whole 5 years, and save up to ₱20,000,000 in principal.',
        },
        {
          q: 'Are MP2 dividends taxable?',
          a: 'No. MP2 dividends are tax-free, and the savings are government-guaranteed.',
        },
        {
          q: 'Can I withdraw before 5 years?',
          a: 'Only for specific reasons such as retirement, permanent migration, unemployment from layoff, critical illness or death. Early withdrawal gets back your principal but only 50% of the dividends.',
        },
        {
          q: 'Who can open an MP2 account?',
          a: 'Active Pag-IBIG members with at least one contribution in the last six months, and some pensioners and dual citizens with at least 24 monthly savings.',
        },
      ],
    },
    fil: {
      sections: [
        {
          heading: 'Paano lumalago ang MP2 savings',
          points: [
            'Mag-iipon ka ng hindi bababa sa ₱500 bawat hulog, buwanan o isang bagsakan, sa loob ng 5 taon.',
            'Nagdedeklara ang Pag-IBIG ng dividend rate kada taon: 7.12% sa 2025, 7.10% sa 2024, 7.05% sa 2023.',
            'Compounded: idinadagdag ang dibidendo sa ipon mo kada taon at ibinibigay kasama ng lahat sa maturity. Annual payout: napupunta ang dibidendo sa bank account mo kada taon.',
          ],
        },
        {
          heading: 'Mga halimbawa (sa 7.12% kada taon, compounded)',
          points: ['₱500 kada buwan sa loob ng 5 taon: ang ₱30,000 na ipon ay magiging mga ₱35,921.', '₱50,000 na bagsakan: magiging mga ₱70,522 pagkatapos ng 5 taon.'],
          note: 'Tantiya lang: nakadepende sa kita ng Pag-IBIG ang mga susunod na rate at puwedeng mas mataas o mas mababa.',
        },
      ],
      faqs: [
        {
          q: 'Magkano ang MP2 dividend rate sa 2025?',
          a: '7.12%, ang rate na idineklara ng Pag-IBIG para sa 2025. Ang mga naunang rate ay 7.10% (2024), 7.05% (2023), 7.03% (2022) at 6.00% (2021).',
        },
        {
          q: 'Magkano ang pinakamababang ipon sa MP2?',
          a: '₱500 bawat hulog. Puwede ring isang bagsakan para sa buong 5 taon, at puwedeng mag-ipon ng hanggang ₱20,000,000 na principal.',
        },
        {
          q: 'May buwis ba ang MP2 dividends?',
          a: 'Wala. Tax-free ang MP2 dividends, at garantisado ng gobyerno ang ipon.',
        },
        {
          q: 'Puwede bang mag-withdraw bago ang 5 taon?',
          a: 'Para lang sa mga partikular na dahilan gaya ng pagreretiro, permanenteng paglipat sa ibang bansa, pagkawala ng trabaho dahil sa layoff, malubhang sakit o pagkamatay. Sa maagang withdrawal, buo ang principal pero 50% lang ng dibidendo.',
        },
        {
          q: 'Sino ang puwedeng magbukas ng MP2 account?',
          a: 'Mga aktibong Pag-IBIG member na may kahit isang hulog sa nakaraang anim na buwan, at ilang pensioner at dual citizen na may hindi bababa sa 24 na buwanang ipon.',
        },
      ],
    },
  },
};
