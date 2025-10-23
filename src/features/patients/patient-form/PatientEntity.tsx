import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { useMedicinesQuery } from '@/features/medicine/hooks/useMedicinesQuery';
import { usePatientQuery } from '@/features/patients/hooks/usePatientQuery';
import { PatientForm } from '@/features/patients/patient-form/PatientForm';
import { RelativesForm } from '@/features/patients/patient-form/relatives/RelativesForm';
import { useProtocolsQuery } from '@/features/protocols/hooks/useProtocolsQuery';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { SelectTreatment } from '@/features/schedule/add-treatment/select-treatment/SelectTreatment';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';

interface Props {
  id?: string;
  defaultStep?: number;
}

export const PatientEntity: React.FC<Props> = ({ id, defaultStep = 1 }) => {
  const [currentStep, setCurrentStep] = React.useState(defaultStep);
  const [patientId, setPatientId] = React.useState<number | undefined>(
    id ? parseInt(id, 10) : undefined
  );
  const [treatmentPlan, setTreatmentPlan] =
    React.useState<TreatmentPlanResource>();

  const { data: patient } = usePatientQuery(id);
  const { data: protocols } = useProtocolsQuery();
  const { data: medicines } = useMedicinesQuery();

  const { onClose, dispatchAction } = useActionContext();

  if (id && !patient) {
    return <div>Loading patient data...</div>;
  }

  let steps: Step[] = [
    {
      id: 1,
      label: 'Patient',
      content: (
        <PatientForm
          patient={patient}
          onStepSubmit={userId => {
            setPatientId(userId);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 2,
      label: 'Relatives',
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
          protocols={protocols}
          medicines={medicines}
          onStepSubmit={plan => {
            setTreatmentPlan(plan);
            setCurrentStep(prev => prev + 1);
          }}
          onSkip={() => dispatchAction('patient_quick_view', { id: patientId })}
        />
      ),
    },
    {
      id: 4,
      label: 'Schedule',
      content: (
        <ScheduleTreatment
          treatmentPlan={treatmentPlan}
          onStepSubmit={data => {
            setTreatmentPlan(data);
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
          // onBack={() => setCurrentStep(prev => prev - 1)}
          treatmentPlan={treatmentPlan}
        />
      ),
    },
  ];

  if (patient?.data?.id) {
    steps = [
      {
        id: 1,
        label: 'Patient',
        content: (
          <PatientForm
            patient={patient}
            onStepSubmit={userId => {
              setPatientId(userId);
              setCurrentStep(prev => prev + 1);
            }}
          />
        ),
      },
      {
        id: 2,
        label: 'Relatives',
        content: (
          <RelativesForm
            patientId={patientId}
            relatives={patient?.data.relatives}
            onStepSubmit={onClose}
          />
        ),
      },
    ];
  }

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
