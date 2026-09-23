import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Returns true only when both required server-side Supabase env vars are present.
 * The marketing website must build and serve without these being set.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Service-role client for trusted Atlas server operations only.
 *
 * ARCHITECTURAL RULE:
 * - Normal customer operations must use an authenticated Supabase client
 *   scoped to the user's session so RLS policies are enforced.
 * - The service role bypasses RLS and must ONLY be used for:
 *     • Stripe webhook processing (future Phase 2C)
 *     • Provisioning workers (future Phase 3)
 *     • Infrastructure synchronization jobs
 *     • Controlled administrative operations
 *     • Contact form inserts (see contact route review in docs)
 *
 * Never expose this client or its credentials to browser code.
 */
export function getServiceRoleClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Authenticated user client — enforces RLS for all customer data operations.
 * Pass the user's JWT access token from their session.
 */
export function getUserClient(accessToken: string): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase is not configured.');
  }
  return createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false },
  });
}
