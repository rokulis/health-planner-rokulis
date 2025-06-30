import { getPatients } from '@/app/patients/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';

export default async function Patients() {
  const patients = await getPatients();

  return (
    <DashboardLayout>
      <PatientsList patients={patients} />
    </DashboardLayout>
  );
}
