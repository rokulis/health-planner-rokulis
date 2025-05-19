import { redirect } from 'next/navigation';

import { getToken } from '@/app/actions';
import { getMedicines } from '@/app/medicine/actions';
import { getPatients } from '@/app/patients/actions';
import { getProtocols } from '@/app/protocols/actions';
import { getRooms } from '@/app/rooms/actions';
import { getSchedule } from '@/app/schedule/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { TimelinePage } from '@/features/schedule/timeline/TimelinePage';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Home({ searchParams }: NextServerComponentProps) {
  const params = await searchParams;
  const token = await getToken();
  const rooms = getRooms();
  const patients = getPatients();
  const protocols = getProtocols();
  const medicines = getMedicines();

  const schedule = getSchedule(
    params.date
      ? (params.date as string)
      : new Date().toISOString().split('T')[0]
  );
  //eslint-disable-next-line no-console
  console.log(token);

  if (!token) {
    return redirect('/auth/login');
  }

  return (
    <DashboardLayout>
      <TimelinePage
        roomsData={rooms}
        scheduleData={schedule}
        patientsData={patients}
        protocolsData={protocols}
        medicinesData={medicines}
      />
    </DashboardLayout>
  );
}
