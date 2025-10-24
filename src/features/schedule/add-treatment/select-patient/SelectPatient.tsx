'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelSearchableSelect } from '@/commons/components/form/FloatingLabelSearchableSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import AddPatient from '@/commons/icons/svg/add_patient.svg';
import { usePatientsQuery } from '@/features/patients/hooks/usePatientsQuery';
import {
  PatientResource,
  TreatmentPlanStatus,
} from '@/types/swagger/data-contracts';

interface Props {
  onStepSubmit: (patientId: number) => void;
  showActiveTreatmentPlanError?: boolean;
}

type ExtendedPatientResource = PatientResource & {
  hasActiveTreatmentPlan?: boolean;
};

const FormSchema = z.object({
  patientId: z.coerce.number().positive(),
});

export const SelectPatient: React.FC<Props> = ({
  onStepSubmit,
  showActiveTreatmentPlanError = true,
}) => {
  const { data: patients } = usePatientsQuery();
  const { dispatchAction } = useActionContext();
  const [selectedPatient, setSelectedPatient] = useState<
    ExtendedPatientResource | undefined
  >();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: -1,
    },
  });
  const patientId = form.watch('patientId');

  useEffect(() => {
    if (patients?.data?.[0]?.id) {
      form.reset({ patientId: patients.data[0].id });
    }
  }, [patients?.data, form]);

  useEffect(() => {
    const patient = patients?.data?.find(p => p.id == patientId);
    if (patient) {
      setSelectedPatient({
        ...patient,
        hasActiveTreatmentPlan: patient.treatment_plans?.some(
          plan => plan.status === TreatmentPlanStatus.Confirmed
        ),
      });
    } else {
      setSelectedPatient(undefined);
    }
  }, [patientId, patients?.data]);

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = data => {
    if (typeof onStepSubmit === 'function') {
      onStepSubmit(data.patientId);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <Form {...form}>
        <FormLabel>Select patient</FormLabel>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-between justify-between h-full"
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <FieldWrapper control={form.control} name="patientId">
              <FloatingLabelSearchableSelect
                label="Patient"
                name="patientId"
                options={(patients?.data ?? [])?.map(p => ({
                  value: String(p.id),
                  label: String(p.name),
                }))}
              />
            </FieldWrapper>
            {showActiveTreatmentPlanError &&
            selectedPatient?.hasActiveTreatmentPlan ? (
              <p className="text-sm text-red-500 self-start">
                Patient already has an active treatment plan
              </p>
            ) : null}
            <span className="text-muted-foreground/80">or</span>
            <div className="flex justify-end mb-2 w-full">
              <Button
                onClick={() => dispatchAction('patient_new')}
                className="w-full"
                size="sm"
                variant="outline"
              >
                <div className="flex items-center gap-1">
                  <AddPatient /> Register new patient
                </div>
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={
                showActiveTreatmentPlanError &&
                selectedPatient?.hasActiveTreatmentPlan
              }
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
