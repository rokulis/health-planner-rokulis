import { redirect } from 'next/navigation';

import { getPatients } from '@/app/patients/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientsList } from '@/features/patients/PatientsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Patients(props: NextServerComponentProps) {
  const params = await props.params;
  const patients = await getPatients();

  if (!params.id) {
    return redirect('/patients');
  }

  return (
    <DashboardLayout>
      <PatientsList patients={patients} />
    </DashboardLayout>
  );
}
