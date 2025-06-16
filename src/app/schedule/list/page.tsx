import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { getTreatmentPlans } from '@/app/treatment-plans/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TreatmentPlansList } from '@/features/schedule/treatment-plans-list/TreatmentPlansList';

export default async function Home() {
  const treatmentPlans = getTreatmentPlans();
  const patients = getPatients();
  const protocols = getProtocols();
  const medicines = getMedicines();

  return (
    <DashboardLayout>
      <TreatmentPlansList
        data={treatmentPlans}
        patientsData={patients}
        protocolsData={protocols}
        medicinesData={medicines}
      />
    </DashboardLayout>
  );
}
