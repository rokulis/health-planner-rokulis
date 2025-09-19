'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';

interface Props {
  treatmentPlanId?: number;
}

export const PlanNextCycle: React.FC<Props> = ({ treatmentPlanId }) => {
  const { data: treatmentPlan, isLoading, isFetching } =
    useTreatmentPlanQuery(treatmentPlanId);
  const { onClose } = useActionContext();

  if (!treatmentPlan) return null;

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <ConfirmVisits
      treatmentPlan={treatmentPlan.data}
      onSuccess={() => {
        onClose?.();
      }}
    />
  );
};
