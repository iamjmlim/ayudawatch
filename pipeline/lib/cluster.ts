// Decides whether two headlines from different outlets describe the same story.
// Week 1 uses word overlap; embeddings can replace this later.

const STOPWORDS = new Set([
  // English
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for', 'from', 'by',
  'with', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'it', 'its', 'this', 'that', 'into',
  'over', 'after', 'amid', 'says', 'said', 'say', 'new', 'not', 'no', 'up', 'out', 'about',
  'than', 'more', 'will', 'has', 'have', 'had', 'who', 'what', 'why', 'how', 'his', 'her',
  'their', 'they', 'he', 'she', 'we', 'you', 'can', 'may', 'could', 'should', 'would',
  'news', 'ph', 'philippines', 'philippine', 'pinoy', 'filipino', 'filipinos', 'live', 'updates',
  // Filipino
  'ang', 'ng', 'mga', 'sa', 'na', 'at', 'si', 'ni', 'kay', 'para', 'pa', 'ay', 'din', 'rin',
  // Dates: many unrelated items share today's date in their titles.
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
  'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec',
  'enero', 'pebrero', 'marso', 'abril', 'mayo', 'hunyo', 'hulyo', 'agosto', 'setyembre', 'oktubre', 'nobyembre', 'disyembre',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'today', 'yesterday',
]);

export function titleTokens(title: string): Set<string> {
  const words = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w) && !/^(19|20)\d\d$/.test(w)); // years too
  return new Set(words);
}

export type Similarity = { shared: number; jaccard: number };

export function similarity(a: Set<string>, b: Set<string>): Similarity {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  const union = a.size + b.size - shared;
  return { shared, jaccard: union === 0 ? 0 : shared / union };
}

// Thresholds are deliberately strict: a missed merge only shows a story twice,
// while a wrong merge would mix two different events into one summary.
export const MIN_SHARED_WORDS = 3;
export const MIN_JACCARD = 0.3;
export const CLUSTER_WINDOW_HOURS = 36;

export function isSameStory(a: Set<string>, b: Set<string>): boolean {
  const s = similarity(a, b);
  return s.shared >= MIN_SHARED_WORDS && s.jaccard >= MIN_JACCARD;
}

// More outlets and official sources make a story more important.
export function importanceScore(tiers: number[], newestAt: Date, now = new Date()): number {
  const outletWeight = tiers.reduce((sum, t) => sum + (t === 1 ? 1.5 : 1), 0);
  const ageHours = Math.max(0, (now.getTime() - newestAt.getTime()) / 3_600_000);
  const recency = Math.pow(0.5, ageHours / 12); // halves every 12 hours
  return Math.round(outletWeight * recency * 1000) / 1000;
}
