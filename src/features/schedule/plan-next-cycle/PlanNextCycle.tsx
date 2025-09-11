'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';

interface Props {
  treatmentPlanId?: number;
}

export const PlanNextCycle: React.FC<Props> = ({ treatmentPlanId }) => {
  const { data: treatmentPlan, isLoading } =
    useTreatmentPlanQuery(treatmentPlanId);
  const [suggestedTreatmentPlan, setSuggestedTreatmentPlan] =
    React.useState<TreatmentPlanResource>(treatmentPlan as TreatmentPlanResource);
  const { onClose } = useActionContext();
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps: Step[] = [
    {
      id: 1,
      label: 'Plan Next Visits',
      content: (
        <ScheduleTreatment
          buttonText="Plan Next Visits"
          treatmentPlan={suggestedTreatmentPlan}
          onStepSubmit={data => {
            setSuggestedTreatmentPlan(data);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 2,
      label: 'Confirm',
      content: (
        <ConfirmVisits
          treatmentPlan={suggestedTreatmentPlan}
          onBack={() => setCurrentStep(prev => prev - 1)}
          onSuccess={() => onClose?.()}
        />
      ),
    },
  ];

  if (isLoading) {
    return null;
  }

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
