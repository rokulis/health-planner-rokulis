'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';

interface Props {
  treatmentPlanId?: number;
  visitId?: string;
}

export const UpdateTreatment: React.FC<Props> = ({
  treatmentPlanId,
  visitId,
}) => {
  const {
    data: treatmentPlan,
    isLoading,
    isFetching,
  } = useTreatmentPlanQuery(treatmentPlanId);
  const { onClose } = useActionContext();
  const [currentStep, setCurrentStep] = React.useState(1);

  if (!treatmentPlan) return null;

  const steps: Step[] = [
    {
      id: 1,
      label: 'Re-Schedule',
      content: (
        <ScheduleTreatment
          buttonText="Reschedule Visits"
          treatmentPlan={treatmentPlan.data}
          visitId={visitId}
          onStepSubmit={() => {
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
          treatmentPlan={treatmentPlan.data}
          // onBack={() => setCurrentStep(prev => prev - 1)}
          onSuccess={() => onClose?.()}
        />
      ),
    },
  ];

  if (isLoading || isFetching) {
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
