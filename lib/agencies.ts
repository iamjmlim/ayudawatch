import type { CategorySlug } from './i18n';

// Official government websites for each section. Every link was checked to
// exist (2026-11-23). Some sites block automated readers, but all open in a browser.
export type OfficialLink = { name: string; url: string };

export const OFFICIAL_LINKS: Record<CategorySlug, OfficialLink[]> = {
  ayuda: [
    { name: 'DSWD', url: 'https://www.dswd.gov.ph' },
  ],
  'sss-gsis': [
    { name: 'SSS', url: 'https://www.sss.gov.ph' },
    { name: 'GSIS', url: 'https://www.gsis.gov.ph' },
  ],
  philhealth: [{ name: 'PhilHealth', url: 'https://www.philhealth.gov.ph' }],
  pabahay: [
    { name: 'Pag-IBIG Fund', url: 'https://www.pagibigfund.gov.ph' },
    { name: 'NHA (National Housing Authority)', url: 'https://nha.gov.ph' },
  ],
  eskwela: [
    { name: 'DepEd', url: 'https://www.deped.gov.ph' },
    { name: 'CHED', url: 'https://ched.gov.ph' },
    { name: 'TESDA', url: 'https://www.tesda.gov.ph' },
  ],
  trabaho: [
    { name: 'DOLE', url: 'https://www.dole.gov.ph' },
    { name: 'PhilJobNet', url: 'https://philjobnet.gov.ph' },
  ],
  ofw: [
    { name: 'DMW (Department of Migrant Workers)', url: 'https://dmw.gov.ph' },
    { name: 'OWWA', url: 'https://owwa.gov.ph' },
  ],
  dokumento: [
    { name: 'DFA Passport appointments', url: 'https://www.passport.gov.ph' },
    { name: 'PSA (birth, marriage certificates)', url: 'https://psa.gov.ph' },
    { name: 'PhilSys (National ID)', url: 'https://philsys.gov.ph' },
    { name: 'LTO', url: 'https://lto.gov.ph' },
  ],
  buwis: [{ name: 'BIR', url: 'https://www.bir.gov.ph' }],
  holiday: [
    { name: 'Official Gazette', url: 'https://www.officialgazette.gov.ph' },
    { name: 'PAGASA (weather and typhoons)', url: 'https://www.pagasa.dost.gov.ph' },
  ],
  presyo: [
    { name: 'DTI (prices and SRP)', url: 'https://www.dti.gov.ph' },
    { name: 'LTFRB (fares)', url: 'https://ltfrb.gov.ph' },
    { name: 'ERC (power rates)', url: 'https://www.erc.gov.ph' },
  ],
};
