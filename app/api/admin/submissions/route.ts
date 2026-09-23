import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server credentials are not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET() {
  try {
    await requireAdminSession();

    const supabase = getSupabaseAdmin();

    const { data: submissions, error } = await supabase
      .from('contact_submissions')
      .select('id, name, email, website, message, created_at, ip_address')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }

    return NextResponse.json({ submissions });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Submissions fetch error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching submissions' }, { status: 500 });
  }
}
