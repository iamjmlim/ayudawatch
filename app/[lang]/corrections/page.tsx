import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatDateTime, getDictionary, isLocale } from '@/lib/i18n';
import { getCorrections } from '@/lib/news';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).corrections };
}

async function CorrectionsBody({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const corrections = await getCorrections();
  const contact = process.env.CONTACT_EMAIL;
  const intro =
    lang === 'fil'
      ? 'Kapag may mali sa isang buod, itinatama o inaalis namin ito at inililista rito. Awtomatiko rin ito: kapag itinama o binawi ng isang outlet ang ulat nito, muling sinusuri ang buod at isinusulat muli o inaalis, at nakatala rito ang pagbabago.'
      : 'When a summary contains a mistake, we fix or remove it and list it here. This also happens automatically: if an outlet corrects or withdraws its report, the summary is re-checked and rewritten or removed, and the change is noted here.';
  const empty = lang === 'fil' ? 'Wala pang naitalang pagtatama.' : 'No corrections so far.';

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{t.corrections}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      {contact && (
        <p className="mt-2 text-muted-foreground">
          {t.reportError}{' '}
          <a href={`mailto:${contact}`} className="font-medium text-primary hover:underline">
            {contact}
          </a>
        </p>
      )}
      {corrections.length === 0 ? (
        <p className="mt-10 text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {corrections.map((c, i) => (
            <li key={i} className="py-4">
              <time className="text-xs text-muted-foreground" dateTime={c.createdAt}>
                {formatDateTime(c.createdAt, lang)}
              </time>
              <p className="mt-1 leading-relaxed">{c.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CorrectionsPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <CorrectionsBody params={params} />
    </Suspense>
  );
}
