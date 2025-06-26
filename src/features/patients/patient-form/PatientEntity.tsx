import React from 'react';

import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { PatientForm } from '@/features/patients/patient-form/PatientForm';
import { RelativesForm } from '@/features/patients/patient-form/relatives/RelativesForm';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { SelectTreatment } from '@/features/schedule/add-treatment/select-treatment/SelectTreatment';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  patient?: Patients.GetPatient.ResponseBody;
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
}

export const PatientEntity: React.FC<Props> = ({
  patient,
  protocols,
  medicines,
}) => {
  const [proposedVisits, setProposedVisits] =
    React.useState<TreatmentPlans.PlanVisits.ResponseBody>();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [patientId, setPatientId] = React.useState<number | undefined>(
    undefined
  );

  const steps: Step[] = [
    {
      id: 1,
      label: 'Patient',
      content: (
        <PatientForm
          patient={patient}
          onStepSubmit={id => {
            setPatientId(id);
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
          protocols={protocols}
          medicines={medicines}
          onStepSubmit={() => setCurrentStep(prev => prev + 1)}
        />
      ),
    },
    {
      id: 4,
      label: 'Schedule',
      content: (
        <ScheduleTreatment
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
      content: <ConfirmVisits visits={proposedVisits} />,
    },
  ];

  if (patient?.data?.id) {
    return <PatientForm patient={patient} />;
  }

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
