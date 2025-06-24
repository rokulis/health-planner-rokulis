import { redirect } from 'next/navigation';

import { getRoom, getRooms } from '@/app/rooms/actions';
import { getSectors } from '@/app/sectors/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { RoomsList } from '@/features/rooms/RoomsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Rooms(props: NextServerComponentProps) {
  const params = await props.params;
  const rooms = await getRooms();
  const sectors = await getSectors();

  if (!params.id || isNaN(Number(params.id))) {
    return redirect('/rooms');
  }

  const room = await getRoom(Number(params.id));

  return (
    <DashboardLayout>
      <RoomsList room={room} rooms={rooms} sectors={sectors} />
    </DashboardLayout>
  );
}
