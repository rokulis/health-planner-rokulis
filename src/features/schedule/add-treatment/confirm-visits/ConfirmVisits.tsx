'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePathname, useRouter } from 'next/navigation';

import { confirmTreatmentPlan } from '@/app/schedule/actions';
import { Button } from '@/commons/components/ui/button';
import Cycle from '@/features/schedule/add-treatment/confirm-visits/Cycle';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  visits?: TreatmentPlans.PlanVisits.ResponseBody;
  onBack?: () => void;
  treatmentPlanId?: number;
}

export const ConfirmVisits: React.FC<Props> = ({
  visits,
  onBack,
  treatmentPlanId,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<number | null>(null);
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    if (!treatmentPlanId) {
      return;
    }
    return confirmTreatmentPlan(treatmentPlanId).then(res => {
      if (res.message) {
        toast.error(res.message);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['schedule'],
        });
        toast.success('Visits confirmed successfully');
        router.push(pathname);
      }
    });
  };

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <div className="flex flex-col h-full rounded-md">
        {visits?.data?.treatment_cycles?.map((cycle, idx) => (
          <Cycle
            key={idx}
            cycle={cycle}
            index={idx}
            isOpen={isOpen === idx}
            onToggle={() => setIsOpen(isOpen === idx ? null : idx)}
          />
        ))}
      </div>
      <div className="col-span-6 mt-12 flex justify-between">
        {onBack ? (
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
        ) : null}
        <Button onClick={onConfirm} type="submit" className="w-1/2">
          Confirm Visits
        </Button>
      </div>
    </div>
  );
};
