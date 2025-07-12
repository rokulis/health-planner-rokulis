import { redirect } from 'next/navigation';

import { getPatient, getPatientTreatmentPlans } from '@/app/patients/actions';
import { getTreatmentPlan } from '@/app/schedule/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PatientViewLayout } from '@/features/patients/layouts/PatientViewLayout';
import { PatientTreatmentPlans } from '@/features/patients/patient-view/PatientTreatmentPlans';
import { TreatmentPlanResourceStatusEnum } from '@/types/swagger/data-contracts';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Patients(props: NextServerComponentProps) {
  const params = await props.params;

  if (!params.id) {
    return redirect('/patients');
  }

  const patient = await getPatient(params.id);
  const treatmentPlans = await getPatientTreatmentPlans(params.id);

  const activeTreatmentPlanId = treatmentPlans.data?.find(
    p => p.status === TreatmentPlanResourceStatusEnum.Confirmed
  )?.id;
  const activeTreatmentPlan = await getTreatmentPlan(activeTreatmentPlanId);

  return (
    <DashboardLayout>
      <PatientViewLayout patient={patient}>
        <PatientTreatmentPlans
          patient={patient}
          treatmentPlans={treatmentPlans}
          activeTreatmentPlan={activeTreatmentPlan}
        />
      </PatientViewLayout>
    </DashboardLayout>
  );
}
