import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-side only. The public client uses the publishable key, so Row Level
// Security limits it to published stories. The admin client uses the secret
// key and must only be used behind the admin password check.

export function publicDb(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}

export function adminDb(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}
