import { getRooms } from '@/app/rooms/actions';
import { getSectors } from '@/app/sectors/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { RoomsList } from '@/features/rooms/RoomsList';

export default async function Rooms() {
  const rooms = await getRooms();
  const sectors = await getSectors();

  return (
    <DashboardLayout>
      <RoomsList rooms={rooms} sectors={sectors} />
    </DashboardLayout>
  );
}
