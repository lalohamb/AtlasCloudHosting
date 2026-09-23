import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const ADMIN_SESSION_COOKIE = 'atlas_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

// In-memory rate limiter — resets on server restart, sufficient for admin login
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  expiresAt: number;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET environment variable is not set');
  return secret;
}

function sign(payload: string): string {
  const secret = getSecret();
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

function encodeSession(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function decodeSession(token: string): AdminSession | null {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;

    const expectedSig = sign(payload);
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSig, 'hex');

    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

    const session: AdminSession = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return session;
  } catch {
    return null;
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

export async function setAdminSession(admin: Omit<AdminSession, 'expiresAt'>) {
  const session: AdminSession = {
    ...admin,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  const token = encodeSession(session);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION_MS / 1000,
    path: '/admin',
  });

  return session;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!cookie) return null;

  const session = decodeSession(cookie.value);
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    await clearAdminSession();
    return null;
  }

  return session;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}
