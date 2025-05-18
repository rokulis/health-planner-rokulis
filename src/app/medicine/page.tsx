import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { MedicineList } from '@/features/medicine/MedicineList';

export default function Medicine() {
  return (
    <DashboardLayout>
      <MedicineList />
    </DashboardLayout>
  );
}
