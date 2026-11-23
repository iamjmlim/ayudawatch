import type { MetadataRoute } from 'next';
import { CATEGORY_SLUGS, LOCALES } from '@/lib/i18n';
import { getRecentSlugs } from '@/lib/news';
import { GUIDES } from '@/lib/guides';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getRecentSlugs(500).catch(() => [] as string[]);
  const pages = [
    '',
    '/about',
    '/corrections',
    '/guides',
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    ...CATEGORY_SLUGS.map((c) => `/${c}`),
    ...slugs.map((s) => `/story/${s}`),
  ];

  return pages.flatMap((path) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  );
}
