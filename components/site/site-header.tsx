import Link from 'next/link';
import { CATEGORY_SLUGS, getDictionary, type Locale } from '@/lib/i18n';
import { getActiveCategories } from '@/lib/news';
import { LangSwitch } from './lang-switch';
import { ThemeToggle } from './theme-toggle';
import { SectionNav } from './section-nav';

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const active = new Set(await getActiveCategories().catch(() => [...CATEGORY_SLUGS]));
  // Only sections with recent stories get a tab; the rest would be empty pages.
  const items = [
    { href: `/${locale}`, label: t.navTop },
    { href: `/${locale}/guides`, label: t.guides },
    { href: `/${locale}/calculators`, label: t.calculators },
    { href: `/${locale}/walang-pasok`, label: t.suspensions },
    ...CATEGORY_SLUGS.filter((c) => active.has(c)).map((c) => ({ href: `/${locale}/${c}`, label: t.categories[c] })),
  ];
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
        <Link href={`/${locale}`} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
          <span className="font-serif text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Ayuda<span className="text-primary">Watch</span>
          </span>
          <span className="mt-1 text-[0.8125rem] text-muted-foreground sm:mt-0 sm:text-sm">{t.tagline}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle label={t.themeToggle} />
          <LangSwitch label={t.switchLanguage} ariaLabel={t.switchLanguageLabel} />
        </div>
      </div>
      <SectionNav items={items} label={t.navLabel} />
    </header>
  );
}
