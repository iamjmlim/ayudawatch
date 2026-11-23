// What AyudaWatch covers: government benefits, aid, IDs/documents, school and
// work announcements, and holidays. An article is kept only if its title,
// snippet or feed categories mention one of these.

const TOPICS: RegExp[] = [
  // Social insurance and pensions
  /\bSSS\b|social security system|\bGSIS\b|pension|pensyon|\bECC\b|employees'? compensation/i,
  /philhealth|konsulta|\byakap\b|malasakit|universal health care|\bUHC\b/i,
  /pag-?ibig|\bHDMF\b|housing loan|\bNHA\b|4PH|pambansang pabahay/i,
  // Aid / ayuda
  /\bDSWD\b|ayuda|\b4Ps\b|pantawid|\bAICS\b|\bTUPAD\b|\bAKAP\b|cash aid|financial assistance|subsidy|subsidi|relief (packs|goods)|food packs|social pension|kadiwa|\bSAP\b|fuel subsidy|rice (subsidy|aid)/i,
  // School
  /\bDepEd\b|\bCHED\b|\bTESDA\b|scholarship|iskolar|walang pasok|class(es)? (suspension|suspended)|suspend(ed|s)? classes|enrol?lment|school (calendar|opening|year)|students? aid/i,
  // Work
  /\bDOLE\b|minimum wage|wage hike|13th[- ]month|holiday pay|overtime pay|labor advisory|job fair|employment|\bTUPAD\b/i,
  // OFWs
  /\bDMW\b|\bOWWA\b|\bOFWs?\b|overseas filipino|repatriat|deployment ban/i,
  // IDs and documents
  /\bLTO\b|driver'?s licen[cs]e|vehicle registration|\bDFA\b|passport|\bPSA\b|birth certificate|national id|\bPhilSys\b|\bPhilID\b|\bNBI clearance|voter'?s? (id|registration)|\bCOMELEC\b registration/i,
  // Taxes
  /\bBIR\b|income tax|tax (filing|deadline|refund|exempt)|\bTIN\b|\bVAT\b/i,
  // Holidays and work suspensions
  /(regular|special|national|local) (non-working )?holidays?|holidays? (declared|on|pay)|declares? .{0,30}holidays?|non-working|special working day|work suspension|suspension of work/i,
  // Prices that government sets or controls
  /price (freeze|ceiling)|suggested retail price|\bSRP\b|power rate|meralco rate|fare (hike|increase|matrix)|toll (fee|rate)/i,
  // Scam warnings that use benefits or agencies
  /\bscam|scammer|modus|phishing|fake (page|pages|account|website|text|sms)|fixers?\b|budol|panloloko|huwag (maniwala|magpaloko)|hindi (lehitimo|totoo)/i,
];

// Notices that mention a topic word but aren't news readers can use.
const NOISE = new RegExp(
  [
    'procurement|invitation to bid|bid(ding)? (documents|notice)|supply and delivery|request for quotation|notice of award|job vacanc(y|ies) at|hiring of consultant',
    // lifestyle and shopping features that say "holiday"
    'holiday (gifts?|season|rush|shopping|collection|heritage|sale|getaway|look)|gift guide|christmas (rush|shopping|bazaar)',
    // officials' suspensions and cases are not benefit news
    '(mayor|governor|councilor|officials?) (is |was )?suspended|suspension of (mayor|governor|officials?)',
  ].join('|'),
  'i',
);

export function matchesTopic(text: string): boolean {
  if (NOISE.test(text)) return false;
  return TOPICS.some((re) => re.test(text));
}
