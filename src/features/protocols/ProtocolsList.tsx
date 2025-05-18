'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { AddProtocolForm } from '@/features/protocols/add-protocol/AddProtocolForm';
import { Protocol } from '@/types/swagger/data-contracts';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  data: Promise<Protocols.GetProtocols.ResponseBody>;
}

export const ProtocolsList: React.FC<Props> = ({ data }) => {
  const [addNew, setAddNew] = React.useState(false);
  const protocols = React.use(data);

  const columns: ColumnDef<Protocol>[] = [
    {
      accessorKey: 'name',
      header: 'Protocol',
    },
    {
      accessorKey: 'cancer_type',
      header: 'Cancer Type',
    },
    {
      accessorKey: 'cycle_duration',
      header: 'Cycle Duration',
    },
  ];

  return (
    <PageLayout
      title="Protocols"
      actions={
        <Button
          size="sm"
          className="flex gap-2 items-center"
          onClick={() => setAddNew(true)}
        >
          <Plus />
          Add Protocol
        </Button>
      }
    >
      <AddProtocolForm isOpen={addNew} onClose={() => setAddNew(false)} />
      <DataTable columns={columns} data={protocols.data ?? []} />
    </PageLayout>
  );
};
