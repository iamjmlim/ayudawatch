import { NextResponse, type NextRequest } from 'next/server';

// The site moved from ayudawatch.vercel.app to ayudawatch.com on 2026-11-25. Every request to the old
// address is sent permanently (308) to the same path on the new one, so old links and Facebook posts
// keep working and Google moves rankings to the new domain.
const OLD_HOST = 'ayudawatch.vercel.app';
const NEW_ORIGIN = 'https://ayudawatch.com';

export function proxy(request: NextRequest) {
  if (request.headers.get('host') === OLD_HOST) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`${NEW_ORIGIN}${pathname}${search}`, 308);
  }

  // Sends visitors of "/" to /en or /fil based on their browser language.
  if (request.nextUrl.pathname === '/') {
    const accept = request.headers.get('accept-language')?.toLowerCase() ?? '';
    const prefersFilipino = /(^|,)\s*(fil|tl)\b/.test(accept) && !/^\s*en\b/.test(accept);
    const url = request.nextUrl.clone();
    url.pathname = prefersFilipino ? '/fil' : '/en';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Every page and file except Next.js build assets, so the old-domain redirect covers all URLs.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
