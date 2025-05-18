import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PageLayout } from '@/commons/layouts/PageLayout';
import HospitalTimeline from '@/features/schedule/timeline/Timeline';

export default function Timeline() {
  return (
    <DashboardLayout>
      <PageLayout title="Today’s schedule">
        <HospitalTimeline />
      </PageLayout>
    </DashboardLayout>
  );
}
