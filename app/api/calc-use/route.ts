import { getCalculator } from '@/lib/calculators';
import { publicDb } from '@/lib/supabase';

// Counts one anonymous use of a calculator (see supabase/migrations/0004_calculator_uses.sql).
// Always answers 204 so a missing table or a network error never affects the page.
export async function POST(request: Request) {
  const slug = (await request.text().catch(() => '')).trim();
  if (getCalculator(slug)) {
    try {
      await publicDb().rpc('count_calculator_use', { p_slug: slug });
    } catch {
      // Counting is best-effort.
    }
  }
  return new Response(null, { status: 204 });
}
