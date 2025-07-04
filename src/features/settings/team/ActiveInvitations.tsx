import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format } from 'date-fns';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Invitation } from '@/types/swagger/data-contracts';
import { Invitations } from '@/types/swagger/InvitationsRoute';

interface Props {
  invitations: Invitations.GetInvitations.ResponseBody;
}

export const ActiveInvitations: React.FC<Props> = ({ invitations }) => {
  const columns: ColumnDef<Invitation>[] = [
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: info => (
        <>
          {info.row.original.role.charAt(0).toUpperCase() +
            info.row.original.role.slice(1)}
        </>
      ),
    },
    {
      accessorKey: 'expires_at',
      header: 'Expiration Date',
      cell: info => (
        <>
          {info.row.original.expires_at
            ? format(new Date(info.row.original.expires_at), 'yyyy-MM-dd')
            : '-'}
        </>
      ),
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center my-6 px-6">
        <h2 className="text-xl font-semibold">Pending Invitations</h2>
      </div>
      <DataTable
        columns={columns}
        data={invitations.data ?? []}
        showPagination={false}
      />
    </div>
  );
};
