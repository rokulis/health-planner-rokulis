import React from 'react';

import { formatInTimeZone } from 'date-fns-tz';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Button } from '@/commons/components/ui/button';
import CheckCircleBig from '@/commons/icons/svg/check-circle-big.svg';
import { PlanNextCycle } from '@/features/patients/patient-view/treatment-plans/PlanNextCycle';
import { TreatmentCycleStatus } from '@/types/swagger/data-contracts';
import { Visits } from '@/types/swagger/VisitsRoute';

interface Props {
  visit: Visits.GetVisit.ResponseBody;
}

export const CycleCompleted: React.FC<Props> = ({ visit }) => {
  const { dispatchAction, onClose } = useActionContext();
  const nextCycle = visit?.data?.treatment_cycle?.next_cycle;
  const isNextCyclePlanned = nextCycle?.status !== TreatmentCycleStatus.Created;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4">
      <div className="flex flex-col justify-center items-center gap-2 py-10">
        <CheckCircleBig />
        <div className="font-bold text-2xl mt-4">
          Cycle {visit.data?.treatment_cycle?.cycle_number} Successful
        </div>
        <div className="text-gray-500 mb-4">
          {visit.data?.treatment_plan?.name}
        </div>
        {isNextCyclePlanned && nextCycle?.start_date ? (
          <div className="flex flex-col gap-4 items-center">
            <div className="text-black font-semibold text-sm">
              Next Cycle Starts:{' '}
              {formatInTimeZone(
                new Date(nextCycle?.start_date),
                'UTC',
                'yyyy-MM-dd'
              )}
            </div>
          </div>
        ) : (
          <>
            {!!nextCycle ? (
              <div className="text-danger font-semibold text-sm">
                Next visits not planned
              </div>
            ) : (
              <div className="text-green-800 font-semibold text-sm">
                All cycles completed
              </div>
            )}
          </>
        )}
      </div>
      {isNextCyclePlanned ? (
        <div className="w-full flex gap-4">
          <Button className="flex-1" onClick={onClose} variant="outline">
            Close
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              dispatchAction('view_patient_treatment_plan', {
                id: visit.data?.treatment_plan?.id,
              })
            }
          >
            Preview Plan
          </Button>
        </div>
      ) : (
        <div className="w-full">
          {visit.data?.treatment_plan?.id ? (
            <PlanNextCycle
              size="default"
              className="w-full"
              id={String(visit.data?.treatment_plan?.id)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
