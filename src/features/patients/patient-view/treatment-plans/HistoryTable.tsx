import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { TreatmentPlanStatus } from '@/commons/components/treatment-plan-status/TreatmentPlanStatus';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  treatmentPlans: TreatmentPlans.GetPatientTreatmentPlans.ResponseBody;
}

export const HistoryTable: React.FC<Props> = ({ treatmentPlans }) => {
  const columns: ColumnDef<TreatmentPlanResource>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'diagnosis.name',
      header: 'Diagnosis',
    },
    {
      accessorKey: 'days_between_cycles',
      header: 'Days Between Cycles',
    },
    {
      id: 'medicines',
      header: 'Medicines',
      cell: ({ row }) => {
        const list = row.original.treatment?.flatMap(group =>
          group.treatment_medicines?.map(med => med.medicine?.atc_code)
        );
        return list && list.length > 0 ? list?.join(', ') : '-';
      },
    },
    {
      header: 'Treatment Days',
      cell: ({ row }) => {
        const allDays = row.original.treatment?.flatMap(
          item => item.treatment_days || []
        );
        const uniqueDays = [...new Set(allDays)].sort((a, b) => a - b);

        return (
          <div className="flex">
            {uniqueDays && uniqueDays.length > 0
              ? uniqueDays.map(d => (
                <div
                  key={d}
                  className="rounded-full w-5 h-5 p-1 flex items-center justify-center bg-primary/10 text-xs"
                >
                  {d}
                </div>
              ))
              : '-'}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        if (!row.original.status) {
          return <span className="text-gray-500">-</span>;
        }

        return <TreatmentPlanStatus status={row.original.status} />;
      },
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 mx-4">History</h2>
      <DataTable
        columns={columns}
        data={
          treatmentPlans.data?.filter(
            tp => tp.status !== 'confirmed' && tp.status !== 'draft'
          ) ?? []
        }
      />
    </div>
  );
};
