'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePathname, useRouter } from 'next/navigation';

import { confirmTreatmentPlanCycle } from '@/app/schedule/actions';
import { Button } from '@/commons/components/ui/button';
import Cycle from '@/features/schedule/add-treatment/confirm-visits/Cycle';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';

interface Props {
  treatmentPlan?: TreatmentPlanResource;
  onBack?: () => void;
  onSuccess?: () => void;
}

export const ConfirmVisits: React.FC<Props> = ({
  treatmentPlan,
  onBack,
  onSuccess,
}) => {
  const [currentTreatmentPlan, setCurrentTreatmentPlan] =
    React.useState(treatmentPlan);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    if (!treatmentPlan?.id) {
      return;
    }
    return confirmTreatmentPlanCycle(treatmentPlan?.id).then(res => {
      if (res.message) {
        toast.error(res.message);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['schedule'],
        });
        toast.success('Visits confirmed successfully');
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(pathname);
        }
      }
    });
  };

  const activeCycle = currentTreatmentPlan?.current_cycle;
  const totalCycles = currentTreatmentPlan?.cycles ?? 0;

  const isDisabledSubmit = !!activeCycle?.visits?.find(
    visit => !visit.is_working_day || !visit.bed?.name
  );

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <div className="flex flex-col h-full rounded-md">
        {activeCycle ? (
          <Cycle
            cycle={activeCycle}
            index={activeCycle.cycle_number ?? 1}
            onReschedule={data => setCurrentTreatmentPlan(data)}
          />
        ) : null}
        {totalCycles > 0 ? (
          <div className="text-sm text-gray-600 mt-4 px-2 border border-gray-200 rounded-md p-2">
            Total Cycles: <b>{totalCycles}</b>
            <br />
            Next cycle will be planned after first one is completed.
          </div>
        ) : null}
      </div>
      <div className="col-span-6 mt-12 flex justify-between">
        {onBack ? (
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
        ) : null}
        <Button
          disabled={isDisabledSubmit}
          onClick={onConfirm}
          type="submit"
          className="w-1/2"
        >
          Confirm Visits
        </Button>
      </div>
    </div>
  );
};
