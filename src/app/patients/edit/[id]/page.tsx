import { redirect } from 'next/navigation';

import { getPatient, getPatients } from '@/app/patients/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Patients(props: NextServerComponentProps) {
  const params = await props.params;
  const patients = await getPatients();

  if (!params.id) {
    return redirect('/patients');
  }

  const patient = await getPatient(params.id);

  return (
    <DashboardLayout>
      <PatientsList patients={patients} patient={patient} />
    </DashboardLayout>
  );
}
