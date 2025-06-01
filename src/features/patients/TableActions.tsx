'use client';

import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import Link from 'next/link';

import { deletePatient } from '@/app/patients/actions';
import { useConfirm } from '@/commons/components/confirm/hooks/useConfirm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { PatientResource } from '@/types/swagger/data-contracts';

interface Props {
  patient: PatientResource;
}

export const TableActions: React.FC<Props> = ({ patient }) => {
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: `Delete the patient`,
      message: `You’re going to delete the patient ${patient.name}`,
      proceedText: 'Confirm',
      cancelText: 'No, keep it!',
    });

    if (confirmed && patient.id) {
      toast.success(`Patient ${patient.name} deleted successfully!`);
      return deletePatient(patient.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild={true}>
          <Link href={`/patients/edit/${patient.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
