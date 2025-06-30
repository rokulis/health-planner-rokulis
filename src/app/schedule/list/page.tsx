import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TreatmentPlansList } from '@/features/schedule/treatment-plans-list/TreatmentPlansList';

export default async function ScheduleList() {
  return (
    <DashboardLayout>
      <TreatmentPlansList />
    </DashboardLayout>
  );
}
