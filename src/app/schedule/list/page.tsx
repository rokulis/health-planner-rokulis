import { getTreatmentPlans } from '@/app/treatment-plans/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TreatmentPlansList } from '@/features/schedule/treatment-plans-list/TreatmentPlansList';

export default async function Home() {
  const treatmentPlans = getTreatmentPlans();

  return (
    <DashboardLayout>
      <TreatmentPlansList data={treatmentPlans} />
    </DashboardLayout>
  );
}
