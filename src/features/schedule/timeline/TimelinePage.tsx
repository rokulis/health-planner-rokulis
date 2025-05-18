import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import HospitalTimeline from '@/features/schedule/timeline/Timeline';

export const TimelinePage = () => {
  return (
    <ScheduleLayout>
      <HospitalTimeline />
    </ScheduleLayout>
  );
};
