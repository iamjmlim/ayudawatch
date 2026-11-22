import type { Metadata } from 'next';

type Languages = NonNullable<NonNullable<Metadata['alternates']>['languages']>;

// Next's type only lists some language codes; "fil" (Filipino) is a valid
// hreflang value, so we widen the type here.
export function hreflang(map: Record<string, string>): Languages {
  return map as Languages;
}
