// Quality gate: decides whether an AI summary is safe to auto-publish.
// Everything here is plain code, so it costs no AI calls.

import { CATEGORIES, SENSITIVITIES, type Category, type Sensitivity } from '../ai/prompts.ts';

export type SummaryDraft = {
  skip: boolean;
  skip_reason: string;
  category: Category;
  sensitivity: Sensitivity;
  headline_en: string;
  summary_en: string;
  why_it_matters_en: string;
  headline_fil: string;
  summary_fil: string;
  why_it_matters_fil: string;
};

export type CheckResult = { name: string; passed: boolean; details?: string };

const LIMITS: Record<string, [number, number]> = {
  headline_en: [15, 120],
  summary_en: [120, 900],
  why_it_matters_en: [20, 280],
  headline_fil: [15, 140],
  summary_fil: [120, 1100],
  why_it_matters_fil: [20, 340],
};

// Parses and shape-checks the AI's JSON. Returns the draft or a list of problems.
export function parseDraft(text: string): { draft?: SummaryDraft; problems: string[] } {
  let raw: Record<string, unknown>;
  try {
    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```$/, '');
    raw = JSON.parse(cleaned);
  } catch {
    return { problems: ['Response was not valid JSON.'] };
  }

  const problems: string[] = [];
  const str = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string).trim() : '');
  const skip = raw.skip === true;

  const draft: SummaryDraft = {
    skip,
    skip_reason: str('skip_reason'),
    category: str('category').toLowerCase() as Category,
    sensitivity: str('sensitivity').toLowerCase() as Sensitivity,
    headline_en: str('headline_en'),
    summary_en: str('summary_en'),
    why_it_matters_en: str('why_it_matters_en'),
    headline_fil: str('headline_fil'),
    summary_fil: str('summary_fil'),
    why_it_matters_fil: str('why_it_matters_fil'),
  };
  if (skip) return { draft, problems };

  if (!CATEGORIES.includes(draft.category)) problems.push(`category "${draft.category}" is not one of ${CATEGORIES.join(', ')}.`);
  if (!SENSITIVITIES.includes(draft.sensitivity)) problems.push(`sensitivity "${draft.sensitivity}" is invalid.`);
  for (const [key, [min, max]] of Object.entries(LIMITS)) {
    const len = (draft as Record<string, unknown>)[key] as string;
    if (len.length < min || len.length > max) problems.push(`${key} must be ${min}-${max} characters (was ${len.length}).`);
  }
  return { draft, problems };
}

// ---------- grounding: every number, name and date must come from the sources ----------

// Unicode look-alikes (non-breaking hyphens, curly quotes, special spaces) are
// mapped to plain characters so they never cause false alarms.
export function normalizeText(text: string): string {
  return text
    .normalize('NFKC')
    .replace(/[‐-―−]/g, '-')
    .replace(/[’‘ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[   ]/g, ' ');
}

function normalizeSource(text: string): string {
  return normalizeText(text)
    .toLowerCase()
    .replace(/(\d),(\d)/g, '$1$2');
}

function numbersIn(text: string): string[] {
  const found = text.replace(/(\d),(\d)/g, '$1$2').match(/\d+(?:\.\d+)?/g) ?? [];
  return [...new Set(found)];
}

// Capitalized words that are fine even if the sources don't contain them.
const ALLOWED_CAPITALIZED = new Set(
  [
    'the', 'a', 'an', 'in', 'on', 'at', 'of', 'for', 'and', 'but', 'or', 'to', 'by', 'with', 'from', 'as',
    'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'his', 'her', 'their', 'we', 'i',
    'philippines', 'philippine', 'filipino', 'filipinos', 'pilipinas', 'pinoy', 'manila', 'metro',
    'president', 'vice', 'senator', 'senators', 'senate', 'house', 'congress', 'government', 'department',
    'court', 'police', 'national', 'city', 'province', 'region', 'mr', 'ms', 'mrs', 'dr', 'sen', 'rep',
    'according', 'meanwhile', 'however', 'also', 'after', 'before', 'while', 'under', 'despite', 'during',
    'reports', 'report', 'officials', 'authorities', 'some', 'several', 'many', 'both', 'other', 'there',
    'why', 'what', 'who', 'when', 'where', 'how', 'if', 'no', 'not', 'one', 'two', 'three', 'english', 'tagalog',
  ],
);

function capitalizedWords(text: string): string[] {
  const words: string[] = [];
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const tokens = sentence.split(/\s+/);
    tokens.forEach((tok, i) => {
      const w = tok.replace(/^[^A-Za-z]+|[^A-Za-z'’.-]+$/g, '').replace(/[.]+$/, '');
      if (!/^[A-Z]/.test(w) || w.length < 2) return;
      // Amounts like "P575,944,129" are checked by the number check, not as names.
      if (/\d/.test(tok)) return;
      // Ignore an ordinary capitalized first word of a sentence ("Lawmakers said...").
      const next = tokens[i + 1]?.replace(/^[^A-Za-z]+/, '') ?? '';
      if (i === 0 && !/^[A-Z]/.test(next)) return;
      words.push(w);
    });
  }
  return words;
}

export function groundingChecks(draft: SummaryDraft, sourceText: string): CheckResult[] {
  const source = normalizeSource(sourceText);
  const sourceNumbers = new Set(numbersIn(source));

  const missingNumbers = (text: string) => numbersIn(text).filter((n) => !sourceNumbers.has(n) && !source.includes(n));

  const enMain = normalizeText(`${draft.headline_en} ${draft.summary_en}`);
  const numsEn = [...new Set([...missingNumbers(enMain), ...missingNumbers(draft.why_it_matters_en)])];
  const numsFil = missingNumbers(`${draft.headline_fil} ${draft.summary_fil} ${draft.why_it_matters_fil}`);

  const missingNames = [
    ...new Set(
      // "What it means for you" must also stick to the sources (eligibility, offices, places).
      capitalizedWords(normalizeText(`${enMain} ${draft.why_it_matters_en}`)).filter((w) => {
        const lw = w.toLowerCase().replace(/[’]/g, "'");
        if (ALLOWED_CAPITALIZED.has(lw)) return false;
        const base = lw.replace(/'s$/, '');
        if (source.includes(base)) return false;
        // Plurals of ordinary words ("Prosecutors" when sources say "prosecutor") aren't new facts.
        const singular = base.replace(/(ies)$/, 'y').replace(/(ches|shes|sses|xes)$/, (m) => m.slice(0, -2)).replace(/s$/, '');
        return singular.length < 4 || !source.includes(singular);
      }),
    ),
  ];

  return [
    {
      name: 'numbers_en',
      passed: numsEn.length === 0,
      details: numsEn.length ? `Numbers not found in sources: ${numsEn.join(', ')}` : undefined,
    },
    {
      name: 'numbers_fil',
      passed: numsFil.length === 0,
      details: numsFil.length ? `Filipino text has numbers not found in sources: ${numsFil.join(', ')}` : undefined,
    },
    {
      name: 'names_en',
      passed: missingNames.length === 0,
      details: missingNames.length ? `Names/words not found in sources: ${missingNames.join(', ')}` : undefined,
    },
  ];
}

// ---------- publishing rule by sensitivity ----------

export type OutletInfo = { outlets: number; tier1: number };

// We currently have no tier-1 source, so sensitive stories need 3+ outlets
// (or 2+ including a tier-1 source once one is added).
export function meetsSourceRule(sensitivity: Sensitivity, o: OutletInfo, minOutlets: number): boolean {
  if (sensitivity === 'normal') return o.tier1 >= 1 || o.outlets >= minOutlets;
  return o.outlets >= 3 || (o.outlets >= 2 && o.tier1 >= 1);
}
