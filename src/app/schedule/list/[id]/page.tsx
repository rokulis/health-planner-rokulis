import { redirect } from 'next/navigation';

import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { getSchedule, getVisit } from '@/app/schedule/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TreatmentPlansList } from '@/features/schedule/treatment-plans-list/TreatmentPlansList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Home({
  params,
  searchParams,
}: NextServerComponentProps) {
  const paramsData = await params;
  const search = await searchParams;
  const schedule = getSchedule(
    search.date
      ? (search.date as string)
      : new Date().toISOString().split('T')[0]
  );
  const patients = getPatients();
  const protocols = getProtocols();
  const medicines = getMedicines();

  if (!paramsData.id) {
    return redirect('/schedule/list');
  }

  const visit = getVisit(parseInt(paramsData.id as string, 10));

  return (
    <DashboardLayout>
      <TreatmentPlansList
        visitData={visit}
        scheduleData={schedule}
        patientsData={patients}
        protocolsData={protocols}
        medicinesData={medicines}
      />
    </DashboardLayout>
  );
}
