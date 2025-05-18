import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';

export default function Patients() {
  return (
    <DashboardLayout>
      <PatientsList />
    </DashboardLayout>
  );
}
