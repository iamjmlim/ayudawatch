import { NextResponse, type NextRequest } from 'next/server';

// Sends visitors of "/" to /en or /fil based on their browser language.
export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const prefersFilipino = /(^|,)\s*(fil|tl)\b/.test(accept) && !/^\s*en\b/.test(accept);
  const url = request.nextUrl.clone();
  url.pathname = prefersFilipino ? '/fil' : '/en';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/'],
};
