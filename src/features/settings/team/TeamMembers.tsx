import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { Plus } from 'lucide-react';

import Link from 'next/link';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import { User } from '@/types/swagger/data-contracts';
import { Workspace } from '@/types/swagger/WorkspaceRoute';

interface Props {
  workspace: Workspace.GetWorkspace.ResponseBody;
}

export const TeamMembers: React.FC<Props> = ({ workspace }) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
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
  ];

  return (
    <>
      <div className="flex justify-between items-center my-6 px-6">
        <h2 className="text-xl font-semibold">Team members</h2>
        <Button size="sm" className="btn btn-primary" asChild={true}>
          <Link href="/settings/team/new">
            <Plus /> Add Member
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={workspace.data?.users ?? []}
        showPagination={false}
      />
    </>
  );
};
