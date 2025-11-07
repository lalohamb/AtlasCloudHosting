import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  expiresAt: number;
}

export async function setAdminSession(admin: Omit<AdminSession, 'expiresAt'>) {
  const session: AdminSession = {
    ...admin,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return session;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  if (!sessionCookie) {
    return null;
  }

  try {
    const session: AdminSession = JSON.parse(sessionCookie.value);

    if (session.expiresAt < Date.now()) {
      await clearAdminSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}
