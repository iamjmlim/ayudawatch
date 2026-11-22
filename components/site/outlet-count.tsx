import { cn } from '@/lib/utils';
import { getDictionary, type Locale } from '@/lib/i18n';

// The product's core trust signal: how many independent outlets reported the story.
// Each outlet is one segment, so "5" reads stronger than "2" at a glance.
export function OutletCount({
  count,
  locale,
  size = 'sm',
}: {
  count: number;
  locale: Locale;
  size?: 'sm' | 'md';
}) {
  const t = getDictionary(locale);
  const segments = Math.min(count, 6);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-highlight/25 font-semibold text-foreground tabular-nums dark:bg-highlight/15',
        size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-[0.8125rem]',
      )}
    >
      <span aria-hidden className="flex items-center gap-[3px]">
        {Array.from({ length: segments }, (_, i) => (
          <span key={i} className="h-3 w-[3px] rounded-full bg-highlight-foreground dark:bg-highlight" />
        ))}
      </span>
      {size === 'md' ? t.reportedByCount(count) : t.outlets(count)}
    </span>
  );
}
