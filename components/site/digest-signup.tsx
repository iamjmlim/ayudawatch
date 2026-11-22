import { Mail } from 'lucide-react';
import { getDictionary, type Locale } from '@/lib/i18n';

// Subscribe form for the daily email digest. Posts straight to Buttondown
// (a plain HTML form, as Buttondown requires), so the site stores no emails.
// Hidden until NEXT_PUBLIC_BUTTONDOWN_USERNAME is set.
export function DigestSignup({ locale }: { locale: Locale }) {
  const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;
  if (!username) return null;
  const t = getDictionary(locale);

  return (
    <section
      aria-labelledby="digest-title"
      className="my-12 rounded-xl border border-highlight/50 bg-highlight/10 px-5 py-6 sm:px-7"
    >
      <h2 id="digest-title" className="flex items-center gap-2 font-serif text-xl font-semibold sm:text-2xl">
        <Mail className="size-5 shrink-0 text-primary" aria-hidden />
        {t.digestTitle}
      </h2>
      <p className="mt-1.5 max-w-[34rem] text-pretty text-muted-foreground">{t.digestBody}</p>
      <form
        action={`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}`}
        method="post"
        target="_blank"
        className="mt-4 flex max-w-[30rem] flex-col gap-2 sm:flex-row"
      >
        <label htmlFor={`digest-email-${locale}`} className="sr-only">
          {t.digestEmail}
        </label>
        <input
          id={`digest-email-${locale}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t.digestEmail}
          className="min-h-11 flex-1 rounded-lg border border-input bg-background px-3.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <input type="hidden" name="embed" value="1" />
        <input type="hidden" name="tag" value={`site-${locale}`} />
        <button
          type="submit"
          className="min-h-11 rounded-lg bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {t.digestButton}
        </button>
      </form>
      <p className="mt-2 text-sm text-muted-foreground">{t.digestNote}</p>
    </section>
  );
}
