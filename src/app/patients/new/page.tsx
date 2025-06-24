import { getMedicines } from '@/app/medicine/actions';
import { getPatient, getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Patients(props: NextServerComponentProps) {
  const params = await props.params;
  const patients = await getPatients();
  const protocols = await getProtocols();
  const medicines = await getMedicines();

  const patient = await getPatient(params.id);

  return (
    <DashboardLayout>
      <PatientsList
        patients={patients}
        patient={patient}
        medicines={medicines}
        protocols={protocols}
        isDefaultOpen={true}
      />
    </DashboardLayout>
  );
}
