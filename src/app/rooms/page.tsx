import { getRooms } from '@/app/rooms/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { RoomsList } from '@/features/rooms/RoomsList';

export default async function Rooms() {
  const rooms = await getRooms();

  return (
    <DashboardLayout>
      <RoomsList rooms={rooms} />
    </DashboardLayout>
  );
}
