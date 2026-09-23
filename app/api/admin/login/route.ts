import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { setAdminSession, checkRateLimit, resetRateLimit } from '@/lib/auth';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server credentials are not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const { allowed, retryAfterMs } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Too many login attempts. Try again in ${Math.ceil(retryAfterMs / 60000)} minutes.` },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, email, name, password_hash')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    // Always run bcrypt compare to prevent timing attacks even when user not found
    const dummyHash = '$2a$12$invalidhashfortimingprotectiononly000000000000000000000';
    const hashToCompare = admin?.password_hash ?? dummyHash;
    const isPasswordValid = await bcrypt.compare(password, hashToCompare);

    if (error || !admin || !isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    resetRateLimit(ip);

    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    await setAdminSession({ id: admin.id, email: admin.email, name: admin.name });

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
