import type { Guide } from './types';

// Source: https://www.pagibigfund.gov.ph/member_savings_mp2.html (read in a browser 2026-11-24;
// the site shows a bot check to scripts, so the monthly guide check cannot read it).
export const pagibigMp2: Guide = {
  slug: 'pagibig-mp2',
  category: 'pabahay',
  checkedOn: '2026-11-24',
  sources: [{ name: 'Pag-IBIG Fund: MP2 Savings', url: 'https://www.pagibigfund.gov.ph/member_savings_mp2.html' }],
  en: {
    title: 'Pag-IBIG MP2 Savings: rates, who can save, and how to open an account',
    description:
      'Official MP2 return rates (7.12% for 2025), who can save, the ₱500 minimum, dividend payout options, early withdrawal rules and how to open an account, based on the official Pag-IBIG page.',
    intro:
      'MP2 (Modified Pag-IBIG II) is a voluntary 5-year savings program for active Pag-IBIG members who want to save more and earn higher dividends than the regular Pag-IBIG savings. Here is what the official Pag-IBIG page says.',
    sections: [
      {
        heading: 'Official MP2 return rates',
        points: ['2025: 7.12%', '2024: 7.10%', '2023: 7.05%', '2022: 7.03%', '2021: 6.00%'],
        note: 'Rates are set every year based on Pag-IBIG Fund’s financial performance; Pag-IBIG returns at least 70% of its annual net income to members’ savings as dividends. Past rates do not guarantee future rates.',
      },
      {
        heading: 'Key features',
        points: [
          'Minimum of ₱500 per remittance. You can also pay one lump sum for the whole 5-year period.',
          'Higher dividends than the Pag-IBIG Regular Savings.',
          'Dividends are tax-free, and the savings are government-guaranteed. The dividends themselves depend on Pag-IBIG Fund’s performance.',
          'Up to ₱20,000,000 in principal savings at any time. You can open more than one MP2 account.',
        ],
      },
      {
        heading: 'Who can save',
        points: [
          'Active Pag-IBIG members: at least one monthly contribution within the last six months.',
          'Former members who are pensioners or retirees with other monthly income, regardless of age, with at least 24 monthly savings before retirement.',
          'Natural-born Filipinos who reacquired Filipino citizenship under RA 9225, with at least 24 monthly savings before they migrated.',
        ],
      },
      {
        heading: 'How to open an account',
        steps: [
          'Make sure you are an active Pag-IBIG member (at least one contribution in the last six months).',
          'Open an MP2 account online through Virtual Pag-IBIG, or at any Pag-IBIG branch by submitting the MP2 Savings Enrollment Form.',
          'Once you have your MP2 account number, start saving. Employed members saving through salary deduction give a copy of their enrollment form to their employer.',
        ],
      },
      {
        heading: 'How to pay',
        points: [
          'Salary deduction through your employer.',
          'Online through Virtual Pag-IBIG (Maya, GCash, or Visa, Mastercard or JCB cards), or through GCash, Coins.ph via Bayad, and Maya.',
          'Over the counter at partners in the Philippines such as Asia United Bank, SM Business Centers, Savemore, HyperMart, Bayad, M. Lhuillier and ECPay merchants; abroad through partners such as Philippine National Bank, Asia United Bank and Ventaja merchants.',
          'A single payment above ₱500,000 must be made by personal or manager’s check. Payments above ₱100,000 need proof of income or source of funds (see the checklist on the enrollment form).',
        ],
      },
      {
        heading: 'Getting your dividends',
        points: [
          'Compounded: dividends are added to your savings every year and paid out with everything after the 5-year maturity.',
          'Annual payout: dividends are credited every year to your savings or checking account at a Pag-IBIG-accredited bank. Members without a Philippine bank account get a check.',
          'You choose when you open the account, and it cannot be changed for that account. You can open another MP2 account with a different choice.',
          'If your MP2 matures before that year’s rate is announced, the final year uses the latest declared rate.',
        ],
      },
      {
        heading: 'Claiming at maturity',
        points: [
          'After 5 years, claim online through Virtual Pag-IBIG, or at a branch with the Application for Provident Benefits (APB) form.',
          'You can roll over all or part of it to a new 5-year MP2 account, or choose automatic rollover.',
          'Unclaimed matured MP2 stops earning MP2 dividends but stays available to withdraw any time.',
        ],
      },
      {
        heading: 'Withdrawing early',
        text: 'Active members can withdraw before 5 years only for: total disability or insanity; termination due to health reasons; retirement; permanent migration; unemployment from layoff or company closure; OFW repatriation; death (paid to beneficiaries); critical illness of the account holder or an immediate family member, certified by a doctor and approved by Pag-IBIG; or other reasons approved by the Pag-IBIG Board. Retirees and pensioners can withdraw early for disability or insanity, death, critical illness, or other approved reasons.',
        points: [
          'With compounded dividends: you get your principal, 50% of the dividends from prior years, and 50% of the current year’s dividends once declared.',
          'With annual payout: you get your principal minus 50% of the dividends already paid to you, plus 50% of the current year’s dividends once declared.',
        ],
      },
      {
        heading: 'Good to know',
        points: [
          'The full rules are in Pag-IBIG Fund Circular No. 407, linked from the official MP2 page.',
          'Open and pay for MP2 only through Virtual Pag-IBIG, a Pag-IBIG branch or the official payment partners. Never give your Virtual Pag-IBIG password or one-time PIN to anyone.',
        ],
      },
    ],
  },
  fil: {
    title: 'Pag-IBIG MP2 Savings: rates, sino ang puwede, at paano magbukas ng account',
    description:
      'Opisyal na MP2 return rate (7.12% para sa 2025), sino ang puwedeng mag-ipon, ang ₱500 na minimum, mga paraan ng pagkuha ng dibidendo, patakaran sa maagang withdrawal at paano magbukas ng account, batay sa opisyal na pahina ng Pag-IBIG.',
    intro:
      'Ang MP2 (Modified Pag-IBIG II) ay boluntaryong 5-taong ipon para sa mga aktibong miyembro ng Pag-IBIG na gustong mag-ipon pa at kumita ng mas mataas na dibidendo kaysa sa regular na ipon sa Pag-IBIG. Narito ang sinasabi ng opisyal na pahina ng Pag-IBIG.',
    sections: [
      {
        heading: 'Opisyal na MP2 return rate',
        points: ['2025: 7.12%', '2024: 7.10%', '2023: 7.05%', '2022: 7.03%', '2021: 6.00%'],
        note: 'Itinatakda ang rate taon-taon batay sa kita ng Pag-IBIG Fund; hindi bababa sa 70% ng taunang net income nito ang ibinabalik sa ipon ng mga miyembro bilang dibidendo. Hindi garantiya ang mga nakaraang rate sa mga susunod na rate.',
      },
      {
        heading: 'Mga pangunahing katangian',
        points: [
          'Minimum na ₱500 bawat hulog. Puwede ka ring maghulog nang isang bagsakan para sa buong 5 taon.',
          'Mas mataas na dibidendo kaysa sa Pag-IBIG Regular Savings.',
          'Walang buwis ang dibidendo, at garantisado ng gobyerno ang ipon. Ang dibidendo mismo ay nakadepende sa kita ng Pag-IBIG Fund.',
          'Hanggang ₱20,000,000 na principal na ipon anumang oras. Puwede kang magbukas ng higit sa isang MP2 account.',
        ],
      },
      {
        heading: 'Sino ang puwedeng mag-ipon',
        points: [
          'Mga aktibong miyembro ng Pag-IBIG: may kahit isang buwanang hulog sa loob ng nakaraang anim na buwan.',
          'Mga dating miyembro na pensioner o retirado na may ibang buwanang kita, anuman ang edad, na may hindi bababa sa 24 na buwanang ipon bago nagretiro.',
          'Mga natural-born na Pilipinong muling naging Pilipino sa ilalim ng RA 9225, na may hindi bababa sa 24 na buwanang ipon bago lumipat sa ibang bansa.',
        ],
      },
      {
        heading: 'Paano magbukas ng account',
        steps: [
          'Siguraduhing aktibo kang miyembro ng Pag-IBIG (may kahit isang hulog sa nakaraang anim na buwan).',
          'Magbukas ng MP2 account online sa Virtual Pag-IBIG, o sa kahit anong Pag-IBIG branch sa pagsumite ng MP2 Savings Enrollment Form.',
          'Kapag may MP2 account number ka na, puwede ka nang mag-ipon. Ang mga employed na mag-iipon sa pamamagitan ng salary deduction ay magbibigay ng kopya ng enrollment form sa kanilang employer.',
        ],
      },
      {
        heading: 'Paano maghulog',
        points: [
          'Salary deduction sa pamamagitan ng employer mo.',
          'Online sa Virtual Pag-IBIG (Maya, GCash, o Visa, Mastercard o JCB card), o sa GCash, Coins.ph via Bayad, at Maya.',
          'Over the counter sa mga partner sa Pilipinas gaya ng Asia United Bank, SM Business Centers, Savemore, HyperMart, Bayad, M. Lhuillier at ECPay merchants; sa ibang bansa sa mga partner gaya ng Philippine National Bank, Asia United Bank at Ventaja merchants.',
          'Ang isang hulog na lampas ₱500,000 ay dapat sa personal o manager’s check. Ang mga hulog na lampas ₱100,000 ay kailangan ng patunay ng kita o pinagmulan ng pera (tingnan ang checklist sa enrollment form).',
        ],
      },
      {
        heading: 'Pagkuha ng dibidendo',
        points: [
          'Compounded: idinadagdag ang dibidendo sa ipon mo taon-taon at kukunin kasama ng lahat pagkatapos ng 5-taong maturity.',
          'Annual payout: ipinapadala ang dibidendo taon-taon sa savings o checking account mo sa bangkong accredited ng Pag-IBIG. Tseke ang ibibigay sa mga walang bank account sa Pilipinas.',
          'Pipiliin mo ito sa pagbubukas ng account, at hindi na ito mababago para sa account na iyon. Puwede kang magbukas ng ibang MP2 account na may ibang pili.',
          'Kung mag-mature ang MP2 mo bago ianunsyo ang rate ng taong iyon, ang pinakahuling idineklarang rate ang gagamitin sa huling taon.',
        ],
      },
      {
        heading: 'Pagkuha sa maturity',
        points: [
          'Pagkatapos ng 5 taon, kunin online sa Virtual Pag-IBIG, o sa branch gamit ang Application for Provident Benefits (APB) form.',
          'Puwede mong i-roll over ang buo o bahagi nito sa bagong 5-taong MP2 account, o piliin ang automatic rollover.',
          'Ang matured na MP2 na hindi kinuha ay hindi na kikita ng MP2 dividend pero puwede pa ring i-withdraw anumang oras.',
        ],
      },
      {
        heading: 'Maagang pag-withdraw',
        text: 'Ang mga aktibong miyembro ay puwedeng mag-withdraw bago ang 5 taon dahil lamang sa: total disability o insanity; pagkatanggal sa trabaho dahil sa kalusugan; pagreretiro; permanenteng paglipat sa ibang bansa; pagkawala ng trabaho dahil sa layoff o pagsasara ng kompanya; pagpapauwi bilang OFW; pagkamatay (ibibigay sa mga beneficiary); malubhang sakit ng may-ari ng account o malapit na kapamilya, na sertipikado ng doktor at aprubado ng Pag-IBIG; o iba pang dahilang aprubado ng Pag-IBIG Board. Ang mga retirado at pensioner ay puwedeng mag-withdraw nang maaga dahil sa disability o insanity, pagkamatay, malubhang sakit, o iba pang aprubadong dahilan.',
        points: [
          'Kung compounded: makukuha mo ang principal, 50% ng dibidendo sa mga nakaraang taon, at 50% ng dibidendo sa kasalukuyang taon kapag naideklara na.',
          'Kung annual payout: makukuha mo ang principal bawas ang 50% ng dibidendong naibayad na sa iyo, at 50% ng dibidendo sa kasalukuyang taon kapag naideklara na.',
        ],
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Nasa Pag-IBIG Fund Circular No. 407 ang buong patakaran, na naka-link sa opisyal na pahina ng MP2.',
          'Magbukas at maghulog sa MP2 lamang sa Virtual Pag-IBIG, sa Pag-IBIG branch o sa mga opisyal na payment partner. Huwag ibigay kahit kanino ang password o one-time PIN ng Virtual Pag-IBIG mo.',
        ],
      },
    ],
  },
};
