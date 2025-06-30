'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { TableActions } from '@/features/protocols/TableActions';
import { ProtocolResource } from '@/types/swagger/data-contracts';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  protocols: Protocols.GetProtocols.ResponseBody;
}

export const ProtocolsList: React.FC<Props> = ({ protocols }) => {
  const { dispatchAction } = useActionContext();

  const columns: ColumnDef<ProtocolResource>[] = [
    {
      accessorKey: 'name',
      header: 'Protocol',
    },
    {
      accessorKey: 'cancer_type',
      header: 'Cancer Type',
      cell: ({ row }) => row.original.diagnosis?.name ?? '-',
    },
    {
      id: 'medicines',
      header: 'Medicines',
      cell: ({ row }) => {
        const list = row.original.protocol_medicine_groups?.flatMap(group =>
          group.protocol_medicines?.map(med => med.medicine?.atc_code)
        );
        return list && list.length > 0 ? list?.join(', ') : 'No medicines';
      },
    },
    {
      accessorKey: 'cycle_duration',
      header: 'Cycle Duration',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <TableActions protocol={row.original} />,
    },
  ];

  return (
    <PageLayout
      title="Protocols"
      actions={
        <Button
          size="sm"
          className="flex gap-2 items-center"
          onClick={() => dispatchAction('protocol_new')}
        >
          <div className="flex gap-2 items-center">
            <Plus />
            Add Protocol
          </div>
        </Button>
      }
    >
      <DataTable columns={columns} data={protocols.data ?? []} />
    </PageLayout>
  );
};
