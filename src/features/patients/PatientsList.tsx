'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format } from 'date-fns';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { PatientsLayout } from '@/features/patients/layouts/PatientsLayout';
import { TableActions } from '@/features/patients/TableActions';
import { PatientResource } from '@/types/swagger/data-contracts';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patients: Patients.GetPatients.ResponseBody;
}

export const PatientsList: React.FC<Props> = ({ patients }) => {
  const router = useRouter();
  const columns: ColumnDef<PatientResource>[] = [
    {
      accessorKey: 'name',
      header: 'Full name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'date_of_birth',
      header: 'Birth date',
      cell: info => (
        <>
          {info.row.original.date_of_birth
            ? format(new Date(info.row.original.date_of_birth), 'yyyy-MM-dd')
            : '-'}
        </>
      ),
    },
    {
      accessorKey: 'personal_code',
      header: 'Personal code',
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone number',
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
    },
    {
      accessorKey: 'height',
      header: 'Height',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: info => <TableActions patient={info.row.original} />,
    },
  ];

  return (
    <PatientsLayout>
      <DataTable
        columns={columns}
        data={patients.data ?? []}
        onRowClick={row => router.push(`/patients/view/${row.original.id}`)}
      />
    </PatientsLayout>
  );
};
