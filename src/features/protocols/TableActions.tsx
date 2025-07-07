'use client';

import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { deleteProtocol } from '@/app/protocols/actions';
import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { useConfirm } from '@/commons/components/confirm/hooks/useConfirm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { Protocol } from '@/types/swagger/data-contracts';

interface Props {
  protocol: Protocol;
}

export const TableActions: React.FC<Props> = ({ protocol }) => {
  const { dispatchAction } = useActionContext();
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: 'Delete Protocol',
      message: `Are you sure you want to delete the protocol "${protocol.name}"? This action cannot be undone.`,
      proceedText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed && protocol.id) {
      toast.success('Protocol deleted successfully');
      return deleteProtocol(protocol.id);
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
            dispatchAction('protocol_edit', { id: protocol.id });
          }}
        >
          Edit
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
