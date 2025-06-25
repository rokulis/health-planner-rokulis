import { redirect } from 'next/navigation';

import { getToken } from '@/app/actions';
import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { getRooms } from '@/app/rooms/actions';
import { getSchedule, getVisit } from '@/app/schedule/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TimelinePage } from '@/features/schedule/timeline/TimelinePage';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Schedule({
  params,
  searchParams,
}: NextServerComponentProps) {
  const paramsData = await params;
  const query = await searchParams;
  const token = await getToken();
  const rooms = getRooms();
  const patients = getPatients();
  const protocols = getProtocols();
  const medicines = getMedicines();

  if (!paramsData.id) {
    return redirect('/schedule');
  }

  const visit = getVisit(parseInt(paramsData.id as string, 10));

  const schedule = getSchedule(
    query.date ? (query.date as string) : new Date().toISOString().split('T')[0]
  );

  if (!token) {
    return redirect('/auth/login');
  }

  return (
    <DashboardLayout>
      <TimelinePage
        visitData={visit}
        roomsData={rooms}
        scheduleData={schedule}
        patientsData={patients}
        protocolsData={protocols}
        medicinesData={medicines}
      />
    </DashboardLayout>
  );
}
