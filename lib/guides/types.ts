import type { CategorySlug } from '../i18n';

// Evergreen how-to guides. Each one is written ONLY from the official page(s)
// listed in `sources`, and `checkedOn` is the date those pages were last read.
// When an agency changes its rules, update the text and the date together.

export type GuideSection = {
  heading: string;
  text?: string; // a short paragraph
  points?: string[]; // bullet list
  steps?: string[]; // numbered list
  note?: string; // shown after the lists
};

export type GuideText = {
  title: string;
  description: string; // one sentence for search results and link previews
  intro: string;
  sections: GuideSection[];
};

export type Guide = {
  slug: string;
  category: CategorySlug;
  checkedOn: string; // YYYY-MM-DD
  sources: { name: string; url: string }[];
  en: GuideText;
  fil: GuideText;
};
