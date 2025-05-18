import { redirect } from 'next/navigation';

import { getToken } from '@/app/actions';

export default async function Home() {
  const token = await getToken();

  if (!token) {
    return redirect('/auth/login');
  }

  return redirect(`/schedule`);
}
