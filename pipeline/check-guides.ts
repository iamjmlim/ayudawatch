// Guide freshness check: re-reads every official page the guides were written
// from and compares it with the copy saved last time. When a page changed (or
// stopped loading), it opens a GitHub issue so a person can update the guide.
// Nothing on the site is changed automatically.
//
//   npm run check-guides             -> check, save new copies, open issues
//   npm run check-guides -- --dry-run -> check and print, save nothing, open no issues
//
// Saved copies live in the settings table under "guide_source:<url>".
// Issues need GITHUB_TOKEN and GITHUB_REPOSITORY (set automatically in Actions);
// without them the changes are only printed.

import { createHash } from 'node:crypto';
import { check, getDb } from './lib/db.ts';
import { GUIDES } from '../lib/guides/index.ts';

const DRY_RUN = process.argv.includes('--dry-run');
const SITE_URL = (process.env.SITE_URL || 'https://ayudawatch.com').replace(/\/$/, '');
const UA = `AyudaWatch/0.1 (+${SITE_URL})`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY;
const LABEL = 'guide-check';

type Saved = { hash: string; text: string; checked_at: string };

// Main page text only, one line per paragraph or list item, so changes show as line diffs.
function pageText(html: string): string {
  let h = html.replace(/<(script|style|noscript|svg|form)[\s\S]*?<\/\1>/gi, '');
  const main = h.match(/<main[\s\S]*?<\/main>/i) ?? h.match(/<article[\s\S]*?<\/article>/i);
  if (main) h = main[0];
  h = h
    .replace(/<\/(p|li|h\d|tr|div|br|td)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#?[a-z0-9]+;/gi, ' ');
  return h
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 1)
    .join('\n');
}

async function fetchSource(url: string): Promise<{ text: string } | { error: string }> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(30_000) });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const type = res.headers.get('content-type') ?? '';
    if (!type.includes('html')) {
      // PDFs and other files: compare the bytes; no line diff is possible.
      const bytes = Buffer.from(await res.arrayBuffer());
      return { text: `[file ${type}] sha256 ${createHash('sha256').update(bytes).digest('hex')}` };
    }
    const text = pageText(await res.text());
    if (/recaptcha|captcha/i.test(text) && text.length < 2000) return { error: 'bot check page (captcha)' };
    if (text.length < 200) return { error: 'page has almost no text' };
    return { text };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

function lineDiff(before: string, after: string) {
  const a = new Set(before.split('\n'));
  const b = new Set(after.split('\n'));
  return {
    removed: [...a].filter((l) => !b.has(l)),
    added: [...b].filter((l) => !a.has(l)),
  };
}

async function github(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ayudawatch-guide-check',
    },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function openIssue(title: string, body: string) {
  if (!GITHUB_TOKEN || !REPO) {
    console.log(`(no GITHUB_TOKEN; would open issue) ${title}\n${body.replace(/^/gm, '  | ')}`);
    return;
  }
  // One open issue per guide: add a comment instead of opening a duplicate.
  const open = (await github(`/issues?state=open&labels=${LABEL}&per_page=100`)) as { number: number; title: string }[];
  const existing = open.find((i) => i.title === title);
  if (existing) {
    await github(`/issues/${existing.number}/comments`, { method: 'POST', body: JSON.stringify({ body }) });
    console.log(`  commented on issue #${existing.number}`);
  } else {
    const created = (await github('/issues', { method: 'POST', body: JSON.stringify({ title, body, labels: [LABEL] }) })) as { number: number };
    console.log(`  opened issue #${created.number}`);
  }
}

const quote = (lines: string[], max = 25) =>
  lines.length ? lines.slice(0, max).map((l) => `> ${l.slice(0, 300)}`).join('\n') + (lines.length > max ? `\n> … and ${lines.length - max} more lines` : '') : '_(none)_';

async function main() {
  const db = getDb();
  const today = new Date(Date.now() + 8 * 3_600_000).toISOString().slice(0, 10); // Philippine date
  const stats = { sources: 0, unchanged: 0, firstSeen: 0, changed: 0, unreachable: 0 };

  for (const guide of GUIDES) {
    for (const source of guide.sources) {
      stats.sources++;
      const key = `guide_source:${source.url}`;
      const saved = (check(await db.from('settings').select('value').eq('key', key).maybeSingle(), 'read saved copy') as {
        value: Saved;
      } | null)?.value;
      let result = await fetchSource(source.url);
      if ('error' in result && /timeout|aborted|fetch failed/i.test(result.error)) result = await fetchSource(source.url); // one retry
      const title = `Guide check: ${guide.en.title}`;
      const guideLink = `${SITE_URL}/en/guides/${guide.slug}`;

      if ('error' in result) {
        stats.unreachable++;
        console.log(`! ${guide.slug}: ${source.url} could not be read (${result.error})`);
        // A page that is gone needs attention; temporary errors and bot checks are only logged.
        if (/HTTP 404|HTTP 410/.test(result.error) && !DRY_RUN) {
          await openIssue(
            title,
            `The official page for **${guide.en.title}** returned **${result.error}** on ${today}. It may have moved.\n\n` +
              `- Official page: ${source.url}\n- Guide: ${guideLink}\n- Guide file: \`lib/guides/${guide.slug}.ts\` (last checked ${guide.checkedOn})\n\n` +
              'Find the new official page, re-check the guide against it, and update the source link and `checkedOn` date.',
          );
        }
        continue;
      }

      const hash = createHash('sha256').update(result.text).digest('hex');
      if (!saved) {
        stats.firstSeen++;
        console.log(`+ ${guide.slug}: saved first copy of ${source.url}`);
      } else if (saved.hash === hash) {
        stats.unchanged++;
        console.log(`= ${guide.slug}: unchanged`);
      } else {
        stats.changed++;
        const { removed, added } = lineDiff(saved.text, result.text);
        console.log(`~ ${guide.slug}: CHANGED (${removed.length} lines removed, ${added.length} added) ${source.url}`);
        if (!DRY_RUN) {
          await openIssue(
            title,
            `The official page for **${guide.en.title}** changed between ${saved.checked_at} and ${today}.\n\n` +
              `- Official page: ${source.url}\n- Guide: ${guideLink}\n- Guide file: \`lib/guides/${guide.slug}.ts\` (last checked ${guide.checkedOn})\n\n` +
              `**Removed or changed lines**\n${quote(removed)}\n\n**New lines**\n${quote(added)}\n\n` +
              'If any requirement, amount, date or step changed, update the guide (both languages) and its `checkedOn` date. ' +
              'If the change does not affect the guide (layout, news links), close this issue.',
          );
        }
      }

      if (!DRY_RUN && saved?.hash !== hash) {
        const value: Saved = { hash, text: result.text, checked_at: today };
        check(await db.from('settings').upsert({ key, value }), 'save copy');
      }
    }
  }
  console.log(`${DRY_RUN ? 'DRY RUN. ' : ''}Done:`, stats);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
