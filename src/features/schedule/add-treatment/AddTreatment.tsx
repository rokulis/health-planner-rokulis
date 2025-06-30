'use client';

import React from 'react';

import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { ConfirmVisits } from '@/features/schedule/add-treatment/confirm-visits/ConfirmVisits';
import { ScheduleTreatment } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { SelectPatient } from '@/features/schedule/add-treatment/select-patient/SelectPatient';
import { SelectTreatment } from '@/features/schedule/add-treatment/select-treatment/SelectTreatment';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  patients: Patients.GetPatients.ResponseBody;
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
}

export const AddTreatment: React.FC<Props> = ({
  patients,
  protocols,
  medicines,
}) => {
  const [proposedVisits, setProposedVisits] =
    React.useState<TreatmentPlans.PlanVisits.ResponseBody>();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [patientId, setPatientId] = React.useState<number | undefined>(
    undefined
  );
  const [treatmentPlanId, setTreatmentPlanId] = React.useState<
    number | undefined
  >();

  // Define your steps with their content
  const steps: Step[] = [
    {
      id: 1,
      label: 'Patient',
      content: (
        <SelectPatient
          onStepSubmit={data => {
            setPatientId(data);
            setCurrentStep(prev => prev + 1);
          }}
          patients={patients}
        />
      ),
    },
    {
      id: 2,
      label: 'Treatment',
      content: (
        <SelectTreatment
          patientId={patientId}
          protocols={protocols}
          medicines={medicines}
          onStepSubmit={planId => {
            setTreatmentPlanId(planId);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 3,
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
      id: 4,
      label: 'Confirm',
      content: (
        <ConfirmVisits
          treatmentPlanId={treatmentPlanId}
          visits={proposedVisits}
          onBack={() => setCurrentStep(prev => prev - 1)}
        />
      ),
    },
  ];

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepChange={step => setCurrentStep(step)}
    />
  );
};
