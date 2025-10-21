'use client';

import React, { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { formatInTimeZone } from 'date-fns-tz';

import { useRouter, useSearchParams } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { usePatientsQuery } from '@/features/patients/hooks/usePatientsQuery';
import { PatientsLayout } from '@/features/patients/layouts/PatientsLayout';
import { TableActions } from '@/features/patients/TableActions';
import {
  PatientResource,
  TreatmentPlanStatus as TreatmentPlanStatusEnum,
} from '@/types/swagger/data-contracts';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patients: Patients.GetPatients.ResponseBody;
}

export const PatientsList: React.FC<Props> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const { data: patients, isLoading } = usePatientsQuery(search);

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
            ? formatInTimeZone(
              new Date(info.row.original.date_of_birth),
              'UTC',
              'yyyy-MM-dd'
            )
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
      header: 'Active treatment plan',
      cell: info => {
        const activePlan = info.row.original.treatment_plans?.find(
          plan => plan.status === TreatmentPlanStatusEnum.Confirmed
        );

        return activePlan ? activePlan.name : '-';
      },
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
        data={patients?.data ?? []}
        isLoading={isLoading}
        onRowClick={row => router.push(`/patients/view/${row.original.id}`)}
      />
    </PatientsLayout>
  );
};
