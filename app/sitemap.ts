import type { MetadataRoute } from 'next';
import { CATEGORY_SLUGS, LOCALES } from '@/lib/i18n';
import { getSitemapStories } from '@/lib/news';
import { GUIDES } from '@/lib/guides';
import { CALCULATORS } from '@/lib/calculators';
import { TABLES } from '@/lib/tables';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getSitemapStories(500).catch(() => []);
  const newest = stories[0]?.updatedAt;
  // Pages listing stories change with the newest story; guides and calculators with their last official check.
  const pages: { path: string; lastModified?: string }[] = [
    { path: '', lastModified: newest },
    { path: '/about' },
    { path: '/corrections' },
    { path: '/guides' },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, lastModified: g.checkedOn })),
    { path: '/calculators' },
    ...CALCULATORS.map((c) => ({ path: `/calculators/${c.slug}`, lastModified: c.checkedOn })),
    ...TABLES.map((t) => ({ path: `/tables/${t.slug}`, lastModified: t.checkedOn })),
    { path: '/holidays/2026', lastModified: '2026-11-25' },
    { path: '/holidays/2027', lastModified: '2026-11-25' },
    { path: '/which-benefits' },
    { path: '/walang-pasok', lastModified: newest },
    ...CATEGORY_SLUGS.map((c) => ({ path: `/${c}`, lastModified: newest })),
    ...stories.map((s) => ({ path: `/story/${s.slug}`, lastModified: s.updatedAt })),
  ];

  return pages.flatMap(({ path, lastModified }) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  );
}
