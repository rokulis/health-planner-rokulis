import { getMedicines } from '@/app/medicine/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { MedicineList } from '@/features/medicine/MedicineList';

export default async function Medicine() {
  const medicines = await getMedicines();

  return (
    <DashboardLayout>
      <MedicineList medicines={medicines} />
    </DashboardLayout>
  );
}
