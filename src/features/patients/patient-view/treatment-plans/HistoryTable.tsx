import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { DataTable } from '@/commons/components/data-table/DataTable';
import { TreatmentPlanStatus } from '@/commons/components/treatment-plan-status/TreatmentPlanStatus';
import { VisitStatusIcon } from '@/commons/components/visit-status-icon/VisitStatusIcon';
import { PlanNextCycle } from '@/features/patients/patient-view/treatment-plans/PlanNextCycle';
import {
  TreatmentCycleStatus,
  TreatmentPlanResource,
  TreatmentPlanStatus as TreatmentPlanStatusEnum,
} from '@/types/swagger/data-contracts';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  treatmentPlans: TreatmentPlans.GetPatientTreatmentPlans.ResponseBody;
}

export const HistoryTable: React.FC<Props> = ({ treatmentPlans }) => {
  const { dispatchAction } = useActionContext();

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
      id: 'cycle',
      header: 'Active Cycle',
      cell: ({ row }) => {
        const activeCycle = row.original.treatment_cycles?.find(
          cycle =>
            cycle.status === TreatmentCycleStatus.Planned ||
            cycle.status === TreatmentCycleStatus.InProgress
        );
        const firstNotPlannedCycle = row.original.treatment_cycles?.find(
          cycle => cycle.status === TreatmentCycleStatus.Created
        );
        const shouldPlanNextCycle =
          !!firstNotPlannedCycle &&
          row.original.status === TreatmentPlanStatusEnum.Confirmed;

        return activeCycle ? (
          `Cycle: ${activeCycle?.cycle_number}/${row.original.treatment_cycles?.length ?? 0}`
        ) : (
          <>
            {shouldPlanNextCycle ? (
              <PlanNextCycle
                id={String(firstNotPlannedCycle.id)}
                onSuccess={() =>
                  dispatchAction('view_patient_treatment_plan', {
                    id: row.original.id,
                  })
                }
              />
            ) : (
              <span className="text-gray-500">No active cycle</span>
            )}
          </>
        );
      },
    },
    {
      header: 'Cycle Visits',
      cell: ({ row }) => {
        const activeCycle = row.original.treatment_cycles?.find(
          cycle =>
            cycle.status === TreatmentCycleStatus.Planned ||
            cycle.status === TreatmentCycleStatus.InProgress
        );

        return (
          <div className="flex justify-center w-full">
            {activeCycle?.visits && activeCycle?.visits.length > 0 ? (
              activeCycle.visits.map(visit => (
                <span key={visit.id} className="text-sm text-gray-700 mr-2">
                  {visit.status ? (
                    <VisitStatusIcon status={visit.status} />
                  ) : null}
                </span>
              ))
            ) : (
              <span className="text-gray-500">-</span>
            )}
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
      <h2 className="text-xl font-semibold text-gray-900 mb-4 mx-4">
        Treatment plans
      </h2>
      <DataTable
        columns={columns}
        data={
          treatmentPlans.data?.filter(
            p => p.status !== TreatmentPlanStatusEnum.Draft
          ) ?? []
        }
        onRowClick={row =>
          dispatchAction('view_patient_treatment_plan', { id: row.original.id })
        }
      />
    </div>
  );
};
