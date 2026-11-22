// Short excerpts for story cards. A sentence ends at . ! ? followed by a space
// and a capital letter (or the end), so decimals ("P27.9"), dates ("Nov. 19")
// and Philippine titles ("Sec.", "Ma.", "Supt.") don't split a sentence.
const ABBREVIATIONS = new RegExp(
  '\\b(?:' +
    [
      // months
      'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Sept', 'Oct', 'Nov', 'Dec',
      // honorifics and titles common in PH news
      'Mr', 'Mrs', 'Ms', 'Ma', 'Dr', 'Atty', 'Engr', 'Arch', 'Hon', 'Pres', 'Sen', 'Rep', 'Cong',
      'Gov', 'Vice', 'Sec', 'Usec', 'Asec', 'Dir', 'Gen', 'Lt', 'Col', 'Maj', 'Capt', 'Brig',
      'Supt', 'Insp', 'Sgt', 'Cpl', 'PCol', 'PBGen', 'PLtCol', 'PMaj', 'Fr', 'Msgr', 'Sr', 'Jr',
      // places and misc
      'St', 'Sto', 'Sta', 'Brgy', 'No', 'Nos', 'vs', 'Inc', 'Corp', 'Co',
    ].join('|') +
    ')\\.$',
);

export function firstSentences(text: string, count: number): string {
  const sentences: string[] = [];
  let start = 0;
  const boundary = /[.!?]["”’)]?(?=\s+["“‘(]?[A-Z0-9ÑÁÉÍÓÚ])/g;
  let m: RegExpExecArray | null;
  while ((m = boundary.exec(text)) && sentences.length < count) {
    const end = m.index + m[0].length;
    if (ABBREVIATIONS.test(text.slice(Math.max(0, end - 8), end))) continue;
    sentences.push(text.slice(start, end).trim());
    start = end;
  }
  if (sentences.length < count) sentences.push(text.slice(start).trim());
  return sentences.filter(Boolean).slice(0, count).join(' ');
}
