import type { Locale } from './i18n';

// Text of the Privacy Policy and Contact pages. Everything here describes what the site actually does
// (see app/[lang]/layout.tsx, lib/theme.ts, app/api/calc-use, components/calculators/calculator-view.tsx).

export const FB_PAGE_URL = 'https://www.facebook.com/profile.php?id=61596808412985';
export const POLICY_UPDATED = '2026-11-26';

export type LegalSection = { heading: string; points?: string[]; text?: string };
export type LegalPage = { title: string; description: string; intro: string; sections: LegalSection[] };

export const PRIVACY: Record<Locale, LegalPage> = {
  en: {
    title: 'Privacy Policy',
    description: 'What AyudaWatch collects (very little), what it never collects, and how ads and cookies may be used.',
    intro:
      'AyudaWatch is a free information site. We do not have user accounts, we never ask for your personal information, and we keep the data we collect to a minimum. This page explains exactly what that is.',
    sections: [
      {
        heading: 'What we collect',
        points: [
          'Anonymous visit counts: we use Vercel Web Analytics to count page views. It does not use cookies and does not identify you.',
          'Anonymous calculator counts: when you use a calculator, we record only which calculator was used and the date, so we know which ones are most useful. Nothing about you or the numbers you entered is recorded.',
          'Standard server logs: our hosting provider (Vercel) may keep technical logs, such as IP addresses, for security and to keep the site running.',
        ],
      },
      {
        heading: 'What we never collect',
        points: [
          'The numbers you type into calculators (salary, contributions and others) stay in your browser. They are never sent to us or stored.',
          'We never ask for your name, ID numbers, SSS, PhilHealth or Pag-IBIG numbers, passwords or payment details.',
          'We do not process benefit applications. Anyone claiming to do so for AyudaWatch is not us.',
        ],
      },
      {
        heading: 'Cookies and your browser',
        points: [
          'We do not use cookies for analytics.',
          'If you switch between light and dark mode, your choice is saved in your browser’s local storage so the site remembers it. It never leaves your device.',
        ],
      },
      {
        heading: 'Advertising',
        text: 'We may show ads from Google (Google AdSense) to keep the site free. Google and its partners may use cookies to show ads based on your visits to this and other websites. You can turn off personalized ads in Google’s Ads Settings (adssettings.google.com), and learn more at policies.google.com/technologies/ads.',
      },
      {
        heading: 'Links to other sites',
        text: 'We link to official government pages and to news outlets. Those sites have their own privacy policies; we are not responsible for how they handle your data.',
      },
      {
        heading: 'Changes and questions',
        text: 'If we change this policy, we will update this page and its date. For questions, message us through our Facebook Page (see our Contact page).',
      },
    ],
  },
  fil: {
    title: 'Privacy Policy',
    description: 'Ano ang kinokolekta ng AyudaWatch (napakakaunti), ano ang hindi kailanman kinokolekta, at paano maaaring gamitin ang ads at cookies.',
    intro:
      'Libreng information site ang AyudaWatch. Wala kaming user account, hindi kami humihingi ng personal na impormasyon, at pinakakaunti lang ang datos na kinokolekta namin. Ipinaliliwanag dito kung ano iyon.',
    sections: [
      {
        heading: 'Ano ang kinokolekta namin',
        points: [
          'Bilang ng bisita na walang pagkakakilanlan: gumagamit kami ng Vercel Web Analytics para bilangin ang page views. Hindi ito gumagamit ng cookies at hindi ka nito nakikilala.',
          'Bilang ng paggamit ng calculator: kapag gumamit ka ng calculator, itinatala lang namin kung aling calculator at ang petsa, para malaman kung alin ang pinakanakatutulong. Walang naitatala tungkol sa iyo o sa mga numerong inilagay mo.',
          'Karaniwang server logs: maaaring magtago ang aming hosting provider (Vercel) ng teknikal na logs, gaya ng IP address, para sa seguridad at maayos na takbo ng site.',
        ],
      },
      {
        heading: 'Ano ang hindi namin kailanman kinokolekta',
        points: [
          'Nananatili sa browser mo ang mga numerong inilalagay mo sa calculator (sahod, kontribusyon at iba pa). Hindi ito ipinapadala sa amin o iniimbak.',
          'Hindi kami humihingi ng pangalan, ID number, SSS, PhilHealth o Pag-IBIG number, password o detalye ng bayad.',
          'Hindi kami nagpoproseso ng aplikasyon sa benepisyo. Hindi kami ang sinumang nagsasabing ginagawa ito para sa AyudaWatch.',
        ],
      },
      {
        heading: 'Cookies at ang browser mo',
        points: [
          'Hindi kami gumagamit ng cookies para sa analytics.',
          'Kung magpapalit ka sa light o dark mode, nase-save ang pinili mo sa local storage ng browser mo para matandaan ito ng site. Hindi ito umaalis sa device mo.',
        ],
      },
      {
        heading: 'Advertising',
        text: 'Maaari kaming magpakita ng ads mula sa Google (Google AdSense) para manatiling libre ang site. Maaaring gumamit ang Google at mga partner nito ng cookies para magpakita ng ads batay sa pagbisita mo rito at sa ibang website. Puwede mong i-off ang personalized ads sa Ads Settings ng Google (adssettings.google.com), at alamin pa sa policies.google.com/technologies/ads.',
      },
      {
        heading: 'Mga link sa ibang site',
        text: 'Nagli-link kami sa mga opisyal na pahina ng gobyerno at sa mga news outlet. May sarili silang privacy policy; hindi kami responsable sa paghawak nila ng datos mo.',
      },
      {
        heading: 'Mga pagbabago at tanong',
        text: 'Kung babaguhin namin ang policy na ito, ia-update namin ang pahinang ito at ang petsa nito. Para sa mga tanong, mag-message sa amin sa aming Facebook Page (tingnan ang Contact page).',
      },
    ],
  },
};

export const CONTACT: Record<Locale, LegalPage & { button: string; responseNote: string }> = {
  en: {
    title: 'Contact us',
    description: 'How to reach AyudaWatch for corrections, questions and feedback.',
    intro: 'The fastest way to reach us is a message to the AyudaWatch Facebook Page. We read every message.',
    button: 'Message us on Facebook',
    responseNote: 'We usually reply within a few days.',
    sections: [
      {
        heading: 'Good reasons to message us',
        points: [
          'You found a mistake in a guide, calculator or story. Tell us which page and what the official source says.',
          'An official page we link to has changed or moved.',
          'You have a suggestion for a guide or calculator.',
        ],
      },
      {
        heading: 'What we cannot help with',
        points: [
          'We are not a government agency and cannot process, check or speed up benefit applications, loans or claims. Please contact the agency (SSS, PhilHealth, Pag-IBIG, DSWD and others) directly.',
          'Never send us ID numbers, account numbers, passwords or one-time PINs. We will never ask for them.',
        ],
      },
    ],
  },
  fil: {
    title: 'Makipag-ugnayan sa amin',
    description: 'Paano makipag-ugnayan sa AyudaWatch para sa mga pagwawasto, tanong at feedback.',
    intro: 'Ang pinakamabilis na paraan ay mag-message sa Facebook Page ng AyudaWatch. Binabasa namin ang bawat mensahe.',
    button: 'Mag-message sa Facebook',
    responseNote: 'Karaniwang sumasagot kami sa loob ng ilang araw.',
    sections: [
      {
        heading: 'Magandang dahilan para mag-message',
        points: [
          'May nakita kang mali sa isang gabay, calculator o balita. Sabihin kung aling pahina at ano ang sinasabi ng opisyal na source.',
          'Nagbago o lumipat ang isang opisyal na pahinang nili-link namin.',
          'May mungkahi ka para sa isang gabay o calculator.',
        ],
      },
      {
        heading: 'Hindi namin ito matutulungan',
        points: [
          'Hindi kami ahensya ng gobyerno at hindi namin maipoproseso, masusuri o mapapabilis ang aplikasyon sa benepisyo, loan o claim. Direktang makipag-ugnayan sa ahensya (SSS, PhilHealth, Pag-IBIG, DSWD at iba pa).',
          'Huwag kailanman magpadala sa amin ng ID number, account number, password o one-time PIN. Hindi namin ito hihingin kailanman.',
        ],
      },
    ],
  },
};
