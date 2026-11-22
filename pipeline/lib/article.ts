// Reads an article page once so the AI can summarize it.
// The text is used only in memory for this run and is never stored or published.

import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';

const USER_AGENT = 'Mozilla/5.0 (compatible; AyudaWatch/0.1; +news summarizer)';
const TIMEOUT_MS = 15_000;
// ~1,000 tokens per article: enough for a summary, and keeps us inside free-tier
// tokens-per-minute limits (up to 4 articles per story).
export const MAX_ARTICLE_CHARS = 4_000;

export async function fetchArticleText(url: string): Promise<string | null> {
  let html: string;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' },
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    html = await res.text();
  } catch {
    return null;
  }

  try {
    const { document } = parseHTML(html);
    const article = new Readability(document as unknown as Document).parse();
    const text = article?.textContent?.replace(/\s+/g, ' ').trim();
    if (!text || text.length < 200) return null;
    return text.length > MAX_ARTICLE_CHARS ? text.slice(0, MAX_ARTICLE_CHARS) : text;
  } catch {
    return null;
  }
}
