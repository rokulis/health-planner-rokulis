'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import { SettingsLayout } from '@/features/settings/layouts/SettingsLayout';
import { TeamForm } from '@/features/settings/team/team-form/TeamForm';
import { Invitation } from '@/types/swagger/data-contracts';
import { Invitations } from '@/types/swagger/InvitationsRoute';

interface Props {
  invitations: Invitations.GetInvitations.ResponseBody;
  addNew?: boolean;
}

export const Team: React.FC<Props> = ({ invitations, addNew }) => {
  const router = useRouter();
  const [addNewMember, setAddNewMember] = React.useState(addNew ?? false);

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

  const onClose = () => {
    setAddNewMember(false);
    router.push('/settings/team');
  };

  return (
    <>
      <TeamForm isOpen={addNewMember} onClose={onClose} />
      <SettingsLayout>
        {!!invitations.data ? (
          <>
            <div className="flex justify-between items-center my-6 px-6">
              <h2 className="text-xl font-semibold">Pending Invitations</h2>
              <Button size="sm" className="btn btn-primary" asChild={true}>
                <Link href="/settings/team/new">
                  <Plus /> Add Member
                </Link>
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={invitations.data ?? []}
              showPagination={false}
            />
          </>
        ) : null}
      </SettingsLayout>
    </>
  );
};
