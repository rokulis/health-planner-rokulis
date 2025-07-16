'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { Plus } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { RoomForm } from '@/features/rooms/add-room/RoomForm';
import { TableActions } from '@/features/rooms/TableActions';
import { RoomResource } from '@/types/swagger/data-contracts';
import { Rooms } from '@/types/swagger/RoomsRoute';
import { Sectors } from '@/types/swagger/SectorsRoute';
import { formatTimeToHHMM } from '@/utils/helpers';

interface Props {
  rooms: Rooms.GetAllRooms.ResponseBody;
  sectors: Sectors.GetSectors.ResponseBody;
  room?: Rooms.GetRoom.ResponseBody;
}

export const RoomsList: React.FC<Props> = ({ rooms, sectors, room }) => {
  const router = useRouter();
  const [addRoom, setAddRoom] = React.useState(!!room?.data?.id || false);

  const columns: ColumnDef<RoomResource>[] = [
    {
      accessorKey: 'sector.name',
      header: 'Sector',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      header: 'Working Hours',
      cell: info => {
        const start = info.row.original.work_start_time;
        const end = info.row.original.work_end_time;
        if (start && end) {
          return `${formatTimeToHHMM(start)} - ${formatTimeToHHMM(end)}`;
        }
        return '-';
      },
    },
    {
      accessorKey: 'working_days',
      header: 'Working Days',
      cell: info => {
        const days = info.row.original.working_days || [];
        return days.length > 0
          ? days.flatMap(d => d + 1).join(', ')
          : 'No working days';
      },
    },
    {
      accessorKey: 'beds',
      header: 'Total Spots',
      cell: info => {
        const beds = info.row.original.beds || [];
        return beds.length > 0 ? beds.length : 'No beds';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <TableActions room={row.original} />,
    },
  ];

  const onClose = () => {
    setAddRoom(false);
    router.push('/rooms');
  };

  return (
    <>
      {addRoom ? (
        <RoomForm
          sectors={sectors}
          room={room}
          isOpen={addRoom}
          onClose={onClose}
        />
      ) : null}

      <PageLayout
        title="Rooms"
        actions={
          <Button size="sm" onClick={() => setAddRoom(true)}>
            <Plus /> Add Room
          </Button>
        }
      >
        <DataTable columns={columns} data={rooms.data ?? []} />
      </PageLayout>
    </>
  );
};
