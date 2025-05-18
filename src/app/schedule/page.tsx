import { redirect } from 'next/navigation';

import { getToken } from '@/app/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TimelinePage } from '@/features/schedule/timeline/TimelinePage';

export default async function Home() {
  const token = await getToken();

  if (!token) {
    return redirect('/auth/login');
  }

  return (
    <DashboardLayout>
      <TimelinePage />
    </DashboardLayout>
  );
}
