'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
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
      patientId: 0,
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
          <FieldWrapper control={form.control} name="patientId">
            <FloatingLabelSelect
              label="Patient"
              name="patientId"
              options={(patients.data ?? [])?.map(p => ({
                value: String(p.id),
                label: String(p.name),
              }))}
            />
          </FieldWrapper>
          <div className="flex justify-end">
            <Button>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
