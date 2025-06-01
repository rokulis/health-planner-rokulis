'use client';

import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import Link from 'next/link';

import { deleteMedicine } from '@/app/medicine/actions';
import { useConfirm } from '@/commons/components/confirm/hooks/useConfirm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { Medicine } from '@/types/swagger/data-contracts';

interface Props {
  medicine: Medicine;
}

export const TableActions: React.FC<Props> = ({ medicine }) => {
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: 'Delete Medicine',
      message: `Are you sure you want to delete the medicine ${medicine.name}? This action cannot be undone.`,
      proceedText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed && medicine.id) {
      toast.success(`Medicine ${medicine.name} deleted successfully`);
      return deleteMedicine(medicine.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild={true}>
          <Link href={`/medicine/edit/${medicine.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
