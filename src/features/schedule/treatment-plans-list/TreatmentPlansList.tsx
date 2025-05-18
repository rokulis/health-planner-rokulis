'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  data: Promise<TreatmentPlans.GetTreatmentPlans.ResponseBody>;
}

export const TreatmentPlansList: React.FC<Props> = ({ data }) => {
  const treatmentPlans = React.use(data);

  const columns: ColumnDef<TreatmentPlanResource>[] = [
    {
      accessorKey: 'id',
      header: '#',
    },
    {
      accessorKey: 'patient_id',
      header: 'Patient',
    },
    {
      accessorKey: 'days_between_cycles',
      header: 'Days Between Cycles',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return (
    <>
      <ScheduleLayout>
        <DataTable columns={columns} data={treatmentPlans.data ?? []} />
      </ScheduleLayout>
    </>
  );
};
