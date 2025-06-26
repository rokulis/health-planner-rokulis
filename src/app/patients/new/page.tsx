import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';

export default async function Patients() {
  const patients = await getPatients();
  const protocols = await getProtocols();
  const medicines = await getMedicines();

  return (
    <DashboardLayout>
      <PatientsList
        patients={patients}
        medicines={medicines}
        protocols={protocols}
        isDefaultOpen={true}
      />
    </DashboardLayout>
  );
}
