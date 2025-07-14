'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiErrorResponse = {
  message: string;
  errors: Record<string, string[]>;
  stack?: string;
  ok: boolean;
};

export async function getToken() {
  const cookieStore = await cookies();

  return cookieStore.get('accessToken')?.value;
}

export async function apiClient<TResponse, TRequest extends object = object>(
  input: string | URL | globalThis.Request,
  init?: Omit<RequestInit, 'body'> & { skipAuth?: boolean; body?: TRequest }
): Promise<ApiErrorResponse & TResponse> {
  const token = await getToken();

  const res = await fetch(`${BASE_API_URL}${input}`, {
    ...init,
    body: init?.body && JSON.stringify(init.body),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
      ...((token && { Authorization: `Bearer ${token}` }) || {}),
    },
  });

  if (!init?.skipAuth && res.status === 401) {
    return redirect('/auth/login?sessionExpired=true');
  }

  if (!res.ok) {
    try {
      const { message, errors, data } = await res.json();

      return {
        ok: res.ok,
        message: data?.message ?? message,
        errors: errors,
      } as ApiErrorResponse & TResponse;
    } catch (e) {
      return {
        ok: res.ok,
        message: res.statusText,
        errors: {},
        stack: e,
      } as ApiErrorResponse & TResponse;
    }
  }

  return res.json();
}
