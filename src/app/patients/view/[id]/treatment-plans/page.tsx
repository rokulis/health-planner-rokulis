import { redirect } from 'next/navigation';

import { getPatient, getPatientTreatmentPlans } from '@/app/patients/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientViewLayout } from '@/features/patients/layouts/PatientViewLayout';
import { PatientTreatmentPlans } from '@/features/patients/patient-view/PatientTreatmentPlans';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Patients(props: NextServerComponentProps) {
  const params = await props.params;

  if (!params.id) {
    return redirect('/patients');
  }

  const patient = await getPatient(params.id);
  const treatmentPlans = await getPatientTreatmentPlans(params.id);

  return (
    <DashboardLayout>
      <PatientViewLayout patient={patient}>
        <PatientTreatmentPlans
          patient={patient}
          treatmentPlans={treatmentPlans}
        />
      </PatientViewLayout>
    </DashboardLayout>
  );
}
