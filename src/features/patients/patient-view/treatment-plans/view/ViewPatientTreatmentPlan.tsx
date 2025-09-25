import React from 'react';

import { TreatmentPlanStatus } from '@/commons/components/treatment-plan-status/TreatmentPlanStatus';
import { PlanActions } from '@/features/patients/patient-view/treatment-plans/PlanActions';
import Cycle from '@/features/schedule/add-treatment/confirm-visits/Cycle';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';

interface Props {
  id: number;
}

export const ViewPatientTreatmentPlan: React.FC<Props> = ({ id }) => {
  const { data: plan, isLoading, isFetching } = useTreatmentPlanQuery(id);

  if (!plan || isLoading || isFetching) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col space-y-8 pb-12">
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center">
          <div>Treatment plan information</div>
          <PlanActions activeTreatmentPlan={plan} />
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          <div className="grid grid-cols-[150px_1fr] gap-4">
            <div className="text-gray-600">Protocol name:</div>
            <div className="font-medium">{plan?.data?.name}</div>

            <div className="text-gray-600">Cancer Type:</div>
            <div className="font-medium">
              {plan?.data?.diagnosis?.name ?? '-'}
            </div>

            {plan?.data?.status ? (
              <>
                <div className="text-gray-600">Status:</div>
                <div className="font-medium">
                  <TreatmentPlanStatus status={plan?.data?.status} />
                </div>
              </>
            ) : null}

            <div className="text-gray-600">Days between cycles:</div>
            <div className="font-medium">
              {plan?.data?.days_between_cycles ?? '-'}
            </div>

            <div className="text-gray-600">Patient:</div>
            <div className="font-medium">
              {plan?.data?.patient?.name ?? '-'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center">
          <div>Cycles</div>
        </div>
        <div className="flex flex-col h-full rounded-md">
          {plan?.data?.treatment_cycles?.map((cycle, idx) => (
            <Cycle
              key={idx}
              cycle={cycle}
              index={idx + 1}
              showFUllDetails={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
