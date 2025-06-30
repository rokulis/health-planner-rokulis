import React from 'react';

import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { useMedicinesQuery } from '@/features/medicine/hooks/useMedicinesQuery';
import { usePatientQuery } from '@/features/patients/hooks/usePatientQuery';
import { PatientForm } from '@/features/patients/patient-form/PatientForm';
import { RelativesForm } from '@/features/patients/patient-form/relatives/RelativesForm';
import { useProtocolsQuery } from '@/features/protocols/hooks/useProtocolsQuery';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { SelectTreatment } from '@/features/schedule/add-treatment/select-treatment/SelectTreatment';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  id?: string;
}

export const PatientEntity: React.FC<Props> = ({ id }) => {
  const [proposedVisits, setProposedVisits] =
    React.useState<TreatmentPlans.PlanVisits.ResponseBody>();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [patientId, setPatientId] = React.useState<number | undefined>(
    undefined
  );
  const [treatmentPlanId, setTreatmentPlanId] = React.useState<
    number | undefined
  >();
  const { data: patient } = usePatientQuery(id);
  const { data: protocols } = useProtocolsQuery();
  const { data: medicines } = useMedicinesQuery();

  if (id && !patient) {
    return <div>Loading patient data...</div>;
  }

  const steps: Step[] = [
    {
      id: 1,
      label: 'Patient',
      content: (
        <PatientForm
          patient={patient?.data}
          onStepSubmit={userId => {
            setPatientId(userId);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 2,
      label: 'Relative',
      content: (
        <RelativesForm
          patientId={patientId}
          onStepSubmit={() => setCurrentStep(prev => prev + 1)}
          onSkip={() => setCurrentStep(prev => prev + 1)}
        />
      ),
    },
    {
      id: 3,
      label: 'Treatment',
      content: (
        <SelectTreatment
          patientId={patientId}
          protocols={protocols?.data}
          medicines={medicines?.data}
          onStepSubmit={planId => {
            setTreatmentPlanId(planId);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 4,
      label: 'Schedule',
      content: (
        <ScheduleTreatment
          treatmentPlanId={treatmentPlanId}
          onStepSubmit={data => {
            setProposedVisits(data);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 5,
      label: 'Confirm',
      content: (
        <ConfirmVisits
          onBack={() => setCurrentStep(prev => prev - 1)}
          treatmentPlanId={treatmentPlanId}
          visits={proposedVisits}
        />
      ),
    },
  ];

  if (patient?.data?.data?.id) {
    return <PatientForm patient={patient.data} />;
  }

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
