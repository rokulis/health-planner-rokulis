'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { useTreatmentPlanQuery } from '@/features/schedule/hooks/useTreatmentPlanQuery';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  treatmentPlanId?: number;
  visitId?: string;
}

export const UpdateTreatment: React.FC<Props> = ({
  treatmentPlanId,
  visitId,
}) => {
  const [proposedVisits, setProposedVisits] =
    React.useState<TreatmentPlans.PlanVisits.ResponseBody>();
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
          onStepSubmit={data => {
            setProposedVisits(data);
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
          treatmentPlanId={treatmentPlan?.data?.id}
          visits={proposedVisits}
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
