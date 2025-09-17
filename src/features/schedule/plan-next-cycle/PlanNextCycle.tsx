'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';

interface Props {
  treatmentPlanId?: number;
}

export const PlanNextCycle: React.FC<Props> = ({ treatmentPlanId }) => {
  const { data: treatmentPlan, isLoading } =
    useTreatmentPlanQuery(treatmentPlanId);
  const [suggestedTreatmentPlan, setSuggestedTreatmentPlan] =
    React.useState<TreatmentPlanResource | null>(
      treatmentPlan?.data as TreatmentPlanResource
    );
  const { onClose } = useActionContext();

  React.useEffect(() => {
    if (treatmentPlan && !suggestedTreatmentPlan) {
      setSuggestedTreatmentPlan(treatmentPlan.data as TreatmentPlanResource);
    }
  }, [suggestedTreatmentPlan, treatmentPlan]);

  if (!suggestedTreatmentPlan) return null;

  if (isLoading) {
    return null;
  }

  return (
    <ConfirmVisits
      treatmentPlan={suggestedTreatmentPlan}
      onSuccess={() => {
        onClose?.();
        setSuggestedTreatmentPlan(null);
      }}
    />
  );
};
