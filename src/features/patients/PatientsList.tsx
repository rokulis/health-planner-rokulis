// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { getPatients } from '@/app/patients/actions';
import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { PatientResource } from '@/types/swagger/data-contracts';

export const PatientsList: React.FC = () => {
  const patients = React.use(getPatients());

  const columns: ColumnDef<PatientResource>[] = [
    {
      accessorKey: 'name',
      header: 'Full name',
    },
    {
      accessorKey: 'date_of_birth',
      header: 'Birth date',
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
    },
    {
      accessorKey: 'height',
      header: 'Height',
    },
  ];

  return (
    <PageLayout
      title="Patients"
      actions={
        <Button size="sm" className="flex gap-2 items-center justify-center">
          <Plus />
          Add Patient
        </Button>
      }
    >
      <DataTable columns={columns} data={patients.data ?? []} />
    </PageLayout>
  );
};
