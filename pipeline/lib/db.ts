import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// The pipeline uses the service-role key (server-side only, never in the website code).
export function getDb(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill them in, ' +
        'or run with --dry-run to test feeds without a database.',
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export function check<T>(result: { data: T; error: { message: string } | null }, what: string): T {
  if (result.error) throw new Error(`${what}: ${result.error.message}`);
  return result.data;
}
