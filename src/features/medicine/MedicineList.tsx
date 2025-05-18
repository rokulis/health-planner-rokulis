import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { getMedicines } from '@/app/medicine/actions';
import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { Medicine } from '@/types/swagger/data-contracts';


export const MedicineList: React.FC = () => {
  const medicines = React.use(getMedicines());

  const columns: ColumnDef<Medicine>[] = [
    {
      accessorKey: 'name',
      header: 'Medicine Name',
    },
    {
      accessorKey: 'atc_code',
      header: 'Atc Code',
    },
    {
      accessorKey: 'procedure',
      header: 'Procedure',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
    },
  ];

  return (
    <PageLayout
      title="Medicine"
      actions={
        <Button size="sm" className="flex gap-2 items-center">
          <Plus />
          Add Medicine
        </Button>
      }
    >
      <DataTable columns={columns} data={medicines.data ?? []} />
    </PageLayout>
  );
};
