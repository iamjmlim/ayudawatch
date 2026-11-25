import type { Locale } from './i18n';
import type { Story } from './news';

// schema.org data that helps Google understand pages (NewsArticle for stories,
// NewsMediaOrganization + WebSite for the home page).

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const SITE_NAME = 'AyudaWatch';

export function organization() {
  return {
    '@type': 'NewsMediaOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
  };
}

export function newsArticle(story: Story, lang: Locale) {
  const url = `${SITE_URL}/${lang}/story/${story.slug}`;
  // Never earlier than publication (the row's updated_at can predate published_at).
  const modified = [story.publishedAt, story.summaryUpdatedAt].filter(Boolean).sort().at(-1)!;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.headline.slice(0, 110),
    description: story.summary.slice(0, 300),
    inLanguage: story.lang === 'fil' ? 'fil' : 'en',
    datePublished: story.publishedAt,
    dateModified: modified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: [`${SITE_URL}/${lang}/story/${story.slug}/opengraph-image`],
    author: organization(),
    publisher: organization(),
    // The original reports this summary is based on.
    isBasedOn: story.sources.map((s) => ({ '@type': 'NewsArticle', url: s.url, publisher: { '@type': 'Organization', name: s.outlet } })),
  };
}

/** Breadcrumb trail for Google ("Home › Calculators › …"); `items` are [name, path] from the top. */
export function breadcrumbs(lang: Locale, items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}/${lang}${path}` })),
  };
}

/** A free calculator, described as a web application. */
export function calculatorApp(lang: Locale, slug: string, name: string, description: string) {
  return {
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}/${lang}/calculators/${slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    inLanguage: lang === 'fil' ? 'fil' : 'en',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PHP' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

/** Wraps several schema.org nodes in one JSON-LD document. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function website(lang: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...organization(), '@id': `${SITE_URL}/#organization` },
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: `${SITE_URL}/${lang}`,
        description,
        inLanguage: lang === 'fil' ? 'fil' : 'en',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
