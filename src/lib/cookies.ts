'use server';

import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
  });
}

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}
