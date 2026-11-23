import type { Guide } from './types';

// Source: https://www.sss.gov.ph/funeral-benefit/ (read 2026-11-24).
export const sssFuneralBenefit: Guide = {
  slug: 'sss-funeral-benefit',
  category: 'sss-gsis',
  checkedOn: '2026-11-24',
  sources: [{ name: 'SSS: Funeral Benefit', url: 'https://www.sss.gov.ph/funeral-benefit/' }],
  en: {
    title: 'SSS funeral benefit: how much and how to claim',
    description:
      'How much the SSS funeral benefit is (₱12,000, or ₱20,000 to ₱60,000), who can claim it, the documents you need, and how to file online, based on the official SSS page.',
    intro:
      'The SSS funeral benefit is cash to help pay for the funeral when an SSS member, a permanent total disability pensioner or a retirement pensioner dies. It goes to the person who paid for the funeral. Here is what the official SSS page says.',
    sections: [
      {
        heading: 'How much',
        text: 'Since October 20, 2023:',
        points: [
          'A variable amount from ₱20,000 to ₱60,000 if the member or pensioner paid at least 36 contributions up to the month of death.',
          'A fixed ₱12,000 if the member or pensioner paid at least 1 but fewer than 36 contributions up to the month of death.',
        ],
      },
      {
        heading: 'Who can claim',
        points: [
          'The person who paid for the funeral expenses.',
          'If you are an SSS member, you file online. If you are not an SSS member, you file at any SSS branch.',
        ],
      },
      {
        heading: 'Before you file online',
        points: [
          'You have an SSS number and a registered My.SSS account.',
          'You have a disbursement account enrolled in the Disbursement Account Enrollment Module (DAEM) of My.SSS.',
          'A UMID card or SSS digitized ID is no longer required to file online.',
        ],
      },
      {
        heading: 'How to file online',
        steps: [
          'Log in to your My.SSS account.',
          'Click “Funeral Claim” under the Benefits tab.',
          'Enter the deceased member’s SS number or CRN, surname and given name, date of birth, date of death, and the amount of funeral expenses, then click “Proceed”. SSS checks the details and whether the member qualifies.',
          'Enter the civil status of the deceased, your relationship to them, and choose your disbursement account. If you have a UMID card enrolled as an ATM, the benefit goes there automatically.',
          'Upload the supporting documents (see below). Images and PDF files only, up to 2MB each.',
          'Read the certification and click “Submit” to agree.',
          'Check your email for SSS’s notice about your claim.',
        ],
      },
      {
        heading: 'Documents you need',
        points: [
          'Proof of the deceased’s SSS membership, any one of: their Social Security card or UMID card; SSS records received by SSS (such as E-1, RS-1, NW-1, OW-1 or E-4); employment records showing their SS number (such as a company ID or payslip); or a letter or certification from SSS showing their SS number, issued before their death.',
          'Death certificate registered with the Local Civil Registry or issued by the PSA, or a Certification of Death signed by the civil registry with its official seal.',
          'Official receipt registered with the BIR, showing the names of the claimant and the deceased.',
          'If the surviving legal spouse is claiming, instead of the receipt: the marriage certificate (from the Local or Municipal Civil Registrar, the PSA, a foreign registry with English translation, the NCIP for Indigenous Peoples, or the Shari’a Circuit Clerk of Court for Muslims), plus an online certification that the spouse paid for the funeral.',
          'If a child, parent or other person is claiming: a certification of a memorial or funeral plan paid by the deceased can replace the receipt for children, parents and legal heirs. Also submit one of these: a notarized waiver signed by the surviving spouse; a notarized affidavit of two disinterested persons saying the spouse did not pay or cannot be found; the spouse’s death certificate and marriage certificate if the spouse has died; or the deceased’s CENOMAR if they were single.',
        ],
      },
      {
        heading: 'How it is paid',
        text: 'The benefit is credited to your UMID card enrolled as an ATM, or, without one, to the disbursement account you enrolled in DAEM under the E-Services menu of My.SSS.',
      },
      {
        heading: 'Good to know',
        points: [
          'If there is no death certificate, SSS accepts a certification of non-availability from the Local Civil Registry and the PSA, plus a death certification from the parish or church, a burial certification from the cemetery, or a certification of cremation.',
          'File only through the official My.SSS website or at an SSS branch. Never give your password or one-time PIN to anyone who offers to process your claim.',
        ],
      },
    ],
  },
  fil: {
    title: 'SSS funeral benefit: magkano at paano mag-claim',
    description:
      'Magkano ang SSS funeral benefit (₱12,000, o ₱20,000 hanggang ₱60,000), sino ang puwedeng mag-claim, mga dokumentong kailangan, at paano mag-file online, batay sa opisyal na pahina ng SSS.',
    intro:
      'Ang SSS funeral benefit ay tulong-pinansyal para sa gastos sa libing kapag namatay ang isang miyembro ng SSS, permanent total disability pensioner o retirement pensioner. Ibinibigay ito sa taong nagbayad ng libing. Narito ang sinasabi ng opisyal na pahina ng SSS.',
    sections: [
      {
        heading: 'Magkano',
        text: 'Mula Oktubre 20, 2023:',
        points: [
          'Halagang nag-iiba mula ₱20,000 hanggang ₱60,000 kung nakapaghulog ang miyembro o pensioner ng hindi bababa sa 36 na kontribusyon hanggang sa buwan ng pagkamatay.',
          'Fixed na ₱12,000 kung nakapaghulog ang miyembro o pensioner ng hindi bababa sa 1 pero kulang sa 36 na kontribusyon hanggang sa buwan ng pagkamatay.',
        ],
      },
      {
        heading: 'Sino ang puwedeng mag-claim',
        points: [
          'Ang taong nagbayad ng gastos sa libing.',
          'Kung miyembro ka ng SSS, online ka magfa-file. Kung hindi ka miyembro, sa kahit anong SSS branch ka magfa-file.',
        ],
      },
      {
        heading: 'Bago mag-file online',
        points: [
          'May SSS number ka at rehistradong My.SSS account.',
          'May disbursement account kang naka-enroll sa Disbursement Account Enrollment Module (DAEM) ng My.SSS.',
          'Hindi na kailangan ng UMID card o SSS digitized ID para mag-file online.',
        ],
      },
      {
        heading: 'Paano mag-file online',
        steps: [
          'Mag-log in sa My.SSS account mo.',
          'I-click ang “Funeral Claim” sa ilalim ng Benefits tab.',
          'Ilagay ang SS number o CRN ng namatay na miyembro, apelyido at pangalan, petsa ng kapanganakan, petsa ng pagkamatay, at halaga ng gastos sa libing, pagkatapos ay i-click ang “Proceed”. Susuriin ng SSS ang mga detalye at kung qualified ang miyembro.',
          'Ilagay ang civil status ng namatay, ang relasyon mo sa kanya, at piliin ang disbursement account mo. Kung may UMID card kang naka-enroll bilang ATM, doon awtomatikong mapupunta ang benepisyo.',
          'I-upload ang mga sumusuportang dokumento (tingnan sa ibaba). Mga larawan at PDF lang, hanggang 2MB bawat isa.',
          'Basahin ang certification at i-click ang “Submit” para pumayag.',
          'Tingnan ang email mo para sa abiso ng SSS tungkol sa claim mo.',
        ],
      },
      {
        heading: 'Mga dokumentong kailangan',
        points: [
          'Patunay ng pagiging miyembro ng SSS ng namatay, alinman sa: Social Security card o UMID card niya; mga SSS record na natanggap ng SSS (gaya ng E-1, RS-1, NW-1, OW-1 o E-4); employment record na may SS number niya (gaya ng company ID o payslip); o sulat o certification mula sa SSS na may SS number niya, na inisyu bago siya namatay.',
          'Death certificate na rehistrado sa Local Civil Registry o inisyu ng PSA, o Certification of Death na pirmado ng civil registry at may official seal.',
          'Official receipt na rehistrado sa BIR, na may pangalan ng nagke-claim at ng namatay.',
          'Kung ang naiwang legal na asawa ang magke-claim, sa halip na resibo: marriage certificate (mula sa Local o Municipal Civil Registrar, PSA, registry sa ibang bansa na may English translation, NCIP para sa Indigenous Peoples, o Shari’a Circuit Clerk of Court para sa mga Muslim), at online certification na ang asawa ang nagbayad ng libing.',
          'Kung anak, magulang o ibang tao ang magke-claim: puwedeng ipalit sa resibo ang certification ng memorial o funeral plan na binayaran ng namatay, para sa mga anak, magulang at legal na tagapagmana. Magsumite rin ng isa sa mga ito: notaryadong waiver na pirmado ng naiwang asawa; notaryadong affidavit ng dalawang taong walang interes na nagsasabing hindi nagbayad ang asawa o hindi ito mahanap; death certificate at marriage certificate ng asawa kung patay na rin ito; o CENOMAR ng namatay kung single siya.',
        ],
      },
      {
        heading: 'Paano ito ibinabayad',
        text: 'Ike-credit ang benepisyo sa UMID card mo na naka-enroll bilang ATM, o, kung wala nito, sa disbursement account na in-enroll mo sa DAEM sa ilalim ng E-Services menu ng My.SSS.',
      },
      {
        heading: 'Dapat mong malaman',
        points: [
          'Kung walang death certificate, tumatanggap ang SSS ng certification of non-availability mula sa Local Civil Registry at PSA, kasama ang death certification mula sa parokya o simbahan, burial certification mula sa sementeryo, o certification of cremation.',
          'Mag-file lamang sa opisyal na My.SSS website o sa SSS branch. Huwag ibigay ang password o one-time PIN mo sa sinumang nag-aalok na sila ang magpoproseso ng claim mo.',
        ],
      },
    ],
  },
};
