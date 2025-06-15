'use client';

import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import Link from 'next/link';

import { deleteRoom } from '@/app/rooms/actions';
import { useConfirm } from '@/commons/components/confirm/hooks/useConfirm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { RoomResource } from '@/types/swagger/data-contracts';

interface Props {
  room: RoomResource;
}

export const TableActions: React.FC<Props> = ({ room }) => {
  const [isPending, startTransition] = React.useTransition();
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: 'Delete Room',
      message: `Are you sure you want to delete the room "${room.name}" and all related beds? This action cannot be undone.`,
      proceedText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      startTransition(async () => {
        if (room.id) {
          return deleteRoom(room.id).then(() => {
            toast.success('Room deleted successfully');
          });
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild={true} disabled={isPending}>
          <Link href={`/rooms/edit/${room.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
