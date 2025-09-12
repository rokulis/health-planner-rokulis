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
  visitId?: string;
}

export const UpdateTreatment: React.FC<Props> = ({
  treatmentPlanId,
  visitId,
}) => {
  const { data: treatmentPlan, isLoading } =
    useTreatmentPlanQuery(treatmentPlanId);
  const [suggestedTreatmentPlan, setSuggestedTreatmentPlan] =
    React.useState<TreatmentPlanResource>(treatmentPlan?.data as TreatmentPlanResource);
  const { onClose } = useActionContext();
  const [currentStep, setCurrentStep] = React.useState(1);

  React.useEffect(() => {
    if (treatmentPlan && !suggestedTreatmentPlan) {
      setSuggestedTreatmentPlan(treatmentPlan.data  as TreatmentPlanResource);
    }
  }, [suggestedTreatmentPlan, treatmentPlan]);

  if(!suggestedTreatmentPlan) return null;

  const steps: Step[] = [
    {
      id: 1,
      label: 'Re-Schedule',
      content: (
        <ScheduleTreatment
          buttonText="Reschedule Visits"
          treatmentPlan={suggestedTreatmentPlan}
          visitId={visitId}
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
