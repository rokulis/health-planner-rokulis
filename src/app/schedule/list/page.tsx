import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { getSchedule } from '@/app/schedule/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TreatmentPlansList } from '@/features/schedule/treatment-plans-list/TreatmentPlansList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Home({ searchParams }: NextServerComponentProps) {
  const params = await searchParams;
  const schedule = getSchedule(
    params.date
      ? (params.date as string)
      : new Date().toISOString().split('T')[0]
  );
  const patients = getPatients();
  const protocols = getProtocols();
  const medicines = getMedicines();

  return (
    <DashboardLayout>
      <TreatmentPlansList
        scheduleData={schedule}
        patientsData={patients}
        protocolsData={protocols}
        medicinesData={medicines}
      />
    </DashboardLayout>
  );
}
