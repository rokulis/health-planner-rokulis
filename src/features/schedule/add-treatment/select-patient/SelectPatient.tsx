'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelSearchableSelect } from '@/commons/components/form/FloatingLabelSearchableSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import AddPatient from '@/commons/icons/svg/add_patient.svg';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patients: Patients.GetPatients.ResponseBody;
  onStepSubmit: (patientId: number) => void;
}

const FormSchema = z.object({
  patientId: z.coerce.number(),
});

export const SelectPatient: React.FC<Props> = ({ patients, onStepSubmit }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: patients.data?.[0]?.id ?? -1, // Default to the first patient or -1 if none
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = data => {
    router.push(`?patient=${data.patientId}`);

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
                options={(patients.data ?? [])?.map(p => ({
                  value: String(p.id),
                  label: String(p.name),
                }))}
              />
            </FieldWrapper>
            <span className="text-muted-foreground/80">or</span>
            <div className="flex justify-end mb-2 w-full">
              <Button asChild={true} className="w-full" size="sm" variant="outline">
                <Link href="/patients/new">
                  <AddPatient /> Register new patient
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
