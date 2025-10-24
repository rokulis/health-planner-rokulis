'use client';

import React from 'react';

import { toast } from 'sonner';

import { createVisit } from '@/app/schedule/actions';
import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Step, Stepper } from '@/commons/components/stepper/Stepper';
import { usePatientTreatmentPlansQuery } from '@/features/patients/hooks/usePatientTreatmentPlansQuery';
import { SelectPatient } from '@/features/schedule/add-treatment/select-patient/SelectPatient';
import { ScheduleVisitStep } from '@/features/schedule/add-visit/ScheduleVisitStep';
import { VisitDetails } from '@/features/schedule/add-visit/VisitDetails';
import { CreateVisitPayload } from '@/types/swagger/data-contracts';
type VisitDetailsData = {
  treatmentPlanId?: string;
  sectorId?: string;
  duration?: string;
  reason?: string;
};

export const AddVisit: React.FC = () => {
  const { onClose } = useActionContext();
  const [, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [patientId, setPatientId] = React.useState<number | undefined>(
    undefined
  );
  const [visitDetails, setVisitDetails] = React.useState<
    VisitDetailsData | undefined
  >();
  const { data: treatmentPlansResponse } =
    usePatientTreatmentPlansQuery(patientId);

  const selectedPlan = React.useMemo(() => {
    return treatmentPlansResponse?.data?.find(
      plan => plan.id === Number(visitDetails?.treatmentPlanId)
    );
  }, [treatmentPlansResponse, visitDetails]);

  const sectorId = React.useMemo(() => {
    return selectedPlan?.sector_id ?? Number(visitDetails?.sectorId);
  }, [selectedPlan, visitDetails]);

  const steps: Step[] = [
    {
      id: 1,
      label: 'Patient',
      content: (
        <SelectPatient
          showActiveTreatmentPlanError={false}
          onStepSubmit={data => {
            setPatientId(data);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 2,
      label: 'Treatment',
      content: (
        <VisitDetails
          patientId={patientId}
          onStepSubmit={details => {
            setVisitDetails(details);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ),
    },
    {
      id: 3,
      label: 'Schedule',
      content: (
        <ScheduleVisitStep
          duration={Number(visitDetails?.duration)}
          sectorId={sectorId}
          onStepSubmit={data => {
            if (!patientId || !visitDetails) return;
            startTransition(() => {
              const payload: CreateVisitPayload = {
                patient_id: patientId,
                treatment_plan_id: visitDetails.treatmentPlanId
                  ? Number(visitDetails.treatmentPlanId)
                  : undefined,
                duration: Number(visitDetails.duration),
                notes: visitDetails.reason,
                date: data.start_date,
                time: data.start_time,
                room_id: data.room_id,
                bed_id: data.bed_id,
              };

              createVisit(payload).then(res => {
                if (res.message) {
                  toast.error(res.message);
                } else {
                  toast.success('Visit scheduled successfully');
                  if (onClose) {
                    onClose();
                  }
                }
              });
            });
          }}
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
