import { getDictionary, isLocale } from '@/lib/i18n';
import { getLatestStories } from '@/lib/news';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

function xml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response('Not found', { status: 404 });
  const t = getDictionary(lang);
  const stories = await getLatestStories(lang, undefined, 30);

  const items = stories
    .map((s) => {
      const link = `${SITE_URL}/${lang}/story/${s.slug}`;
      const sources = s.sources.map((src) => src.outlet).join(', ');
      return `<item>
  <title>${xml(s.headline)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(s.publishedAt).toUTCString()}</pubDate>
  ${s.category ? `<category>${xml(t.categories[s.category])}</category>` : ''}
  <description>${xml(`${s.summary} (${t.reportedBy} ${sources})`)}</description>
</item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${xml(`${t.siteName}: ${t.tagline}`)}</title>
  <link>${SITE_URL}/${lang}</link>
  <description>${xml(t.description)}</description>
  <language>${lang === 'fil' ? 'fil' : 'en-ph'}</language>
${items}
</channel>
</rss>`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
