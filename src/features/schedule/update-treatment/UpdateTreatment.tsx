'use client';

import React from 'react';

import { toast } from 'sonner';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
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
  const { onClose } = useActionContext();
  const [currentStep, setCurrentStep] = React.useState(1);
  const { data: treatmentPlan, isLoading } =
    useTreatmentPlanQuery(treatmentPlanId);

  const steps: Step[] = [
    {
      id: 1,
      label: 'Re-Schedule',
      content: (
        <ScheduleTreatment
          buttonText="Reschedule Visits"
          treatmentPlan={treatmentPlan}
          visitId={visitId}
          onStepSubmit={() => {
            toast.success('Visits rescheduled successfully');
            onClose?.();
          }}
        />
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading treatment plan...</div>;
  }

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
