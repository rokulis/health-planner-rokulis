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
}

export const PlanNextCycle: React.FC<Props> = ({
  treatmentPlanId,
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
      label: 'Plan Next Visits',
      content: (
        <ScheduleTreatment
          buttonText="Plan Next Visits"
          treatmentPlan={treatmentPlan}
          planNextCycle={true}
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
