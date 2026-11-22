import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

// Single-user admin login: one password in the ADMIN_PASSWORD env var.
// The cookie holds an HMAC derived from the password, so changing the
// password logs everyone out.

export const ADMIN_COOKIE = 'ayudawatch_admin';

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) return null; // refuse weak or missing passwords
  return createHmac('sha256', password).update('ayudawatch-admin-session-v1').digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHmac('sha256', 'compare').update(a).digest();
  const hb = createHmac('sha256', 'compare').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(given: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) return false;
  return safeEqual(given, password);
}

export function adminConfigured(): boolean {
  return sessionToken() !== null;
}

export async function isAdmin(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, token);
}

export async function startSession() {
  const token = sessionToken();
  if (!token) throw new Error('ADMIN_PASSWORD is not configured');
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: '/admin' });
}
