'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { ProtocolForm } from '@/features/protocols/add-protocol/ProtocolForm';
import { TableActions } from '@/features/protocols/TableActions';
import { ProtocolResource } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
  protocol?: Protocols.GetProtocol.ResponseBody;
}

export const ProtocolsList: React.FC<Props> = ({
  protocols,
  medicines,
  protocol,
}) => {
  const router = useRouter();
  const [addNew, setAddNew] = React.useState(!!protocol?.data?.id || false);

  const columns: ColumnDef<ProtocolResource>[] = [
    {
      accessorKey: 'name',
      header: 'Protocol',
    },
    {
      accessorKey: 'cancer_type',
      header: 'Cancer Type',
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

  const handleClose = () => {
    setAddNew(false);
    router.push('/protocols');
  };

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
      <ProtocolForm
        protocol={protocol}
        medicines={medicines}
        isOpen={addNew}
        onClose={handleClose}
      />
      <DataTable columns={columns} data={protocols.data ?? []} />
    </PageLayout>
  );
};
