import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TimelinePage } from '@/features/schedule/timeline/TimelinePage';

export default async function Home() {
  return (
    <DashboardLayout>
      <TimelinePage />
    </DashboardLayout>
  );
}
