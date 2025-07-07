'use client';

import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { deletePatient } from '@/app/patients/actions';
import { useActionContext } from '@/commons/action-context-provider/useActionContext';
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
  const { dispatchAction } = useActionContext();
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
        <DropdownMenuItem
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();

            dispatchAction('patient_edit', {
              id: patient.id,
            });
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();

            dispatchAction('patient_relatives_edit', {
              id: patient.id,
            });
          }}
        >
          Edit Relatives
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();

            return handleDelete();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
