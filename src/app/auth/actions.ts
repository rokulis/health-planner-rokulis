'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiClient } from '@/app/actions';
import { Auth } from '@/types/swagger/AuthRoute';

export async function login(data: Auth.Login.RequestBody) {
  const res = await apiClient<Auth.Login.ResponseBody, Auth.Login.RequestBody>(
    '/auth/login',
    { method: 'POST', body: data, skipAuth: true }
  );

  if (res.data?.token) {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', res.data.token);

    redirect('/');
  }

  return res;
}
