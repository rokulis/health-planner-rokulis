import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { addPatient, updatePatient } from '@/app/patients/actions';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { patientSchema } from '@/features/patients/patient-form/validations';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patients.GetPatient.ResponseBody;
}

export const PatientForm: React.FC<Props> = ({ isOpen, onClose, patient }) => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: patient?.data?.name ?? '',
      personal_code: patient?.data?.personal_code ?? '',
      date_of_birth: patient?.data?.date_of_birth ?? '',
      email: patient?.data?.email ?? '',
      phone_number: patient?.data?.phone_number ?? '',
      weight: patient?.data?.weight,
      height: patient?.data?.height,
      address: patient?.data?.address ?? '',
    },
  });

  const onSubmit: SubmitHandler<Patients.CreatePatient.RequestBody> = data => {
    return startTransition(async () => {
      if (patient?.data?.id) {
        toast.success('Patient updated successfully');
        return updatePatient(patient.data.id, data).then(() =>
          router.push('/patients')
        );
      }

      toast.success('Patient added successfully');
      return addPatient(data).then(() => onClose());
    });
  };

  return (
    <Drawer
      title="Patient Form"
      isOpen={isOpen}
      onClose={onClose}
    >
      {isPending ? <PageTopLoader /> : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div id="form">
            <FormLabel className="my-4">Personal information</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="name">
                  <FloatingLabelInput label="Full name" id="name" />
                </FieldWrapper>
              </div>
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="personal_code">
                  <FloatingLabelInput
                    label="Personal code"
                    id="personal_code"
                  />
                </FieldWrapper>
              </div>
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="date_of_birth">
                  <FloatingLabelInput
                    label="Date of birth"
                    id="date_of_birth"
                  />
                </FieldWrapper>
              </div>
            </div>

            <FormLabel className="mb-4 mt-8">Body measurements</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="weight">
                  <FloatingLabelInput label="Weight (kg)" id="weight" />
                </FieldWrapper>
              </div>
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="height">
                  <FloatingLabelInput label="Height (cm)" id="height" />
                </FieldWrapper>
              </div>
            </div>

            <FormLabel className="mb-4 mt-8">Contact information</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="email">
                  <FloatingLabelInput label="Email" id="email" />
                </FieldWrapper>
              </div>
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="phone_number">
                  <FloatingLabelInput label="Phone number" id="phone_number" />
                </FieldWrapper>
              </div>
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="address">
                  <FloatingLabelInput label="Address" id="address" />
                </FieldWrapper>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end">
            <Button
              type="submit"
              className="w-1/2"
              disabled={!form.formState.isValid}
            >
              {patient?.data?.id ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
