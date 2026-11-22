import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { getActiveSources } from '@/lib/news';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).about };
}

const COPY: Record<Locale, { title: string; intro: string; steps: [string, string][]; rulesTitle: string; rules: string[]; sourcesTitle: string }> = {
  en: {
    title: 'How AyudaWatch works',
    intro:
      'AyudaWatch is an independent site, not a government website. It follows announcements about government benefits, aid programs, IDs and documents, school and work, and holidays, and turns them into short, clear updates in English and Filipino, always linking to the official source and the original reports.',
    steps: [
      ['Collect', 'Every 30 minutes we read official announcements (DepEd, the Official Gazette, the Philippine News Agency, PhilHealth) and the news feeds of established Philippine outlets, keeping only stories about benefits, aid and public services.'],
      ['Summarize', 'An AI model writes a short summary in our own words, in English and Filipino, using only facts from those sources, plus a short note on what it means for you (who is covered, deadlines, where to apply) when the sources say so.'],
      ['Check', 'Our system checks that every name, number and date appears in the sources. Summaries that fail are rewritten once, or not published.'],
      ['Publish', 'Official announcements can be published on their own. News reports need at least two outlets; sensitive stories need at least three.'],
      ['Correct', 'If a source corrects or withdraws its report, the update is re-checked and rewritten or removed, and the change is listed on our Corrections page.'],
    ],
    rulesTitle: 'Our rules',
    rules: [
      'We are not affiliated with any government agency. Always confirm details with the official agency before acting.',
      'We never ask for personal information, ID numbers, passwords or payments, and we do not process applications. Anyone claiming to do so for AyudaWatch is not us.',
      'We never copy articles or photos. We publish our own short summaries and link to every source.',
      'Every summary is labeled as AI-generated, and mistakes are corrected publicly.',
      'We count page visits without cookies (Vercel Web Analytics).',
    ],
    sourcesTitle: 'Sources we follow',
  },
  fil: {
    title: 'Paano gumagana ang AyudaWatch',
    intro:
      'Ang AyudaWatch ay malayang website at hindi website ng gobyerno. Sinusubaybayan nito ang mga anunsyo tungkol sa benepisyo at ayuda ng gobyerno, mga ID at dokumento, eskwela at trabaho, at mga holiday, at ginagawa itong maikli at malinaw na update sa Filipino at Ingles, laging may link sa opisyal na source at sa orihinal na ulat.',
    steps: [
      ['Pagkuha', 'Tuwing 30 minuto, binabasa namin ang mga opisyal na anunsyo (DepEd, Official Gazette, Philippine News Agency, PhilHealth) at ang mga news feed ng mga kilalang outlet, at kinukuha lang ang mga balita tungkol sa benepisyo, ayuda at serbisyo publiko.'],
      ['Pagbubuod', 'Isang AI model ang sumusulat ng maikling buod sa sarili naming salita, sa Filipino at Ingles, gamit lamang ang mga detalye mula sa mga source, kasama ang maikling paalala kung ano ang ibig sabihin nito para sa iyo (sino ang sakop, deadline, saan mag-a-apply) kung sinabi ito ng mga source.'],
      ['Pagsusuri', 'Sinusuri ng aming sistema na ang bawat pangalan, numero at petsa ay nasa mga source. Ang hindi pumasa ay isinusulat muli nang isang beses, o hindi inilalathala.'],
      ['Paglalathala', 'Maaaring ilathala nang mag-isa ang mga opisyal na anunsyo. Ang mga ulat ng balita ay kailangan ng hindi bababa sa dalawang outlet; ang mga sensitibong balita ay tatlo.'],
      ['Pagtatama', 'Kapag itinama o binawi ng source ang ulat nito, muling sinusuri ang update at isinusulat muli o inaalis, at nakalista ang pagbabago sa aming pahina ng Mga Pagtatama.'],
    ],
    rulesTitle: 'Ang aming mga patakaran',
    rules: [
      'Hindi kami konektado sa anumang ahensya ng gobyerno. Laging kumpirmahin ang mga detalye sa opisyal na ahensya bago kumilos.',
      'Hindi kami humihingi ng personal na impormasyon, ID number, password o bayad, at hindi kami nagpoproseso ng aplikasyon. Ang sinumang nagsasabing ginagawa ito para sa AyudaWatch ay hindi kami.',
      'Hindi kami kumokopya ng artikulo o larawan. Sariling maikling buod lamang ang aming inilalathala, may link sa bawat source.',
      'May label ang bawat buod na gawa ito ng AI, at itinatama namin ang mga pagkakamali nang hayagan.',
      'Binibilang namin ang mga bisita nang walang cookies (Vercel Web Analytics).',
    ],
    sourcesTitle: 'Mga source na sinusubaybayan namin',
  },
};

async function Sources({ title }: { title: string }) {
  const sources = await getActiveSources();
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {sources.map((s) => (
          <li key={s.homepage}>
            <a href={s.homepage} target="_blank" rel="noopener" className="text-primary hover:underline">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function AboutBody({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = COPY[lang];
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{c.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{c.intro}</p>

      <ol className="mt-10 space-y-6">
        {c.steps.map(([name, text], i) => (
          <li key={name} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
            <span className="font-serif text-2xl font-semibold text-primary">{i + 1}</span>
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p className="mt-1 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-lg bg-paper p-6">
        <h2 className="font-serif text-2xl font-semibold">{c.rulesTitle}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          {c.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <Suspense fallback={null}>
        <Sources title={c.sourcesTitle} />
      </Suspense>
    </div>
  );
}

export default function AboutPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={null}>
      <AboutBody params={params} />
    </Suspense>
  );
}
