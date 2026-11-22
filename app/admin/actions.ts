'use server';

import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { adminDb } from '@/lib/supabase';
import { endSession, isAdmin, passwordMatches, startSession } from '@/lib/admin-auth';

// Every action re-checks the session: never trust that only the admin page calls these.
async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Not authorized');
}

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: 'Wrong password.' };
  }
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin');
}

export async function setPublishing(formData: FormData) {
  await requireAdmin();
  const enabled = formData.get('enabled') === 'true';
  const { error } = await adminDb().from('settings').upsert({ key: 'publishing_enabled', value: enabled });
  if (error) throw new Error(error.message);
  redirect('/admin');
}

export async function unpublishStory(formData: FormData) {
  await requireAdmin();
  const storyId = String(formData.get('storyId') ?? '');
  const note = String(formData.get('note') ?? '').trim();
  if (!storyId) throw new Error('Missing story');
  const db = adminDb();

  const { data: summary } = await db
    .from('summaries')
    .select('headline')
    .eq('story_id', storyId)
    .eq('lang', 'en')
    .maybeSingle();
  const { error } = await db.from('stories').update({ status: 'unpublished' }).eq('id', storyId);
  if (error) throw new Error(error.message);

  const headline = summary?.headline ? `“${summary.headline}”` : 'A story';
  await db.from('corrections').insert({
    story_id: storyId,
    note: `${headline} was removed${note ? `: ${note}` : '.'}`,
  });

  updateTag('stories');
  redirect('/admin');
}

export async function setSourceActive(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('sourceId') ?? '');
  const active = formData.get('active') === 'true';
  const { error } = await adminDb().from('sources').update({ active }).eq('id', id);
  if (error) throw new Error(error.message);
  redirect('/admin');
}
