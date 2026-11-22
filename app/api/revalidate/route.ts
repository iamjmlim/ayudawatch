import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';

// Called by the pipeline after publishing so new stories appear right away.
//   POST /api/revalidate   header: x-revalidate-secret: <REVALIDATE_SECRET>
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const given = request.headers.get('x-revalidate-secret') ?? '';
  const ok =
    !!expected && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return Response.json({ revalidated: false }, { status: 401 });

  revalidateTag('stories', 'max');
  return Response.json({ revalidated: true });
}
