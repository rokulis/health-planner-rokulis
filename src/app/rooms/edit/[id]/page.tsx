import { redirect } from 'next/navigation';

import { getRoom, getRooms } from '@/app/rooms/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { RoomsList } from '@/features/rooms/RoomsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Rooms(props: NextServerComponentProps) {
  const params = await props.params;
  const rooms = await getRooms();

  if (!params.id || isNaN(Number(params.id))) {
    return redirect('/rooms');
  }

  const room = await getRoom(Number(params.id));

  return (
    <DashboardLayout>
      {/*@ts-expect-error TODO: Fix in API*/}
      <RoomsList room={room.data} rooms={rooms} />
    </DashboardLayout>
  );
}
