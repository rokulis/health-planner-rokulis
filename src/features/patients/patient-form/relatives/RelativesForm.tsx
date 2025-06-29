import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateRelatives } from '@/app/patients/actions';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { relativesSchema } from '@/features/patients/patient-form/relatives/validations';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patientId?: number;
  onStepSubmit?: () => void;
  onSkip?: () => void;
}

const KINSHIP_OPTIONS = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'child', label: 'Child' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'other', label: 'Other' },
];

export const RelativesForm: React.FC<Props> = ({
  patientId,
  onStepSubmit,
  onSkip,
}) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof relativesSchema>>({
    resolver: zodResolver(relativesSchema),
    defaultValues: {
      relatives: [
        {
          name: '',
          kinship: '',
          email: '',
          phone_number: '',
          address: '',
          id: undefined,
          patient_id: patientId ?? undefined,
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<{
    relatives: Patients.StorePatientRelatives.RequestBody;
  }> = data => {
    return startTransition(async () => {
      if (!patientId) {
        return;
      }
      return updateRelatives(patientId, data.relatives).then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          if (res.success) {
            onStepSubmit?.();
          }
          toast.success('Relatives updated successfully');
        }
      });
    });
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'relatives',
    keyName: '_id',
  });

  return (
    <Form {...form}>
      {isPending ? <PageTopLoader /> : null}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div id="form">
          {fields.map((field, i) => (
            <div className="border-b border-black/10 pb-2" key={field.id}>
              <FormLabel className="my-4">Relative information</FormLabel>
              <div className="grid grid-cols-2 gap-4" key={field.id}>
                <div className="col-span-1">
                  <FieldWrapper
                    control={form.control}
                    name={`relatives.${i}.name`}
                  >
                    <FloatingLabelInput label="Full name" id="name" />
                  </FieldWrapper>
                </div>
                <div className="col-span-1">
                  <FieldWrapper
                    control={form.control}
                    name={`relatives.${i}.kinship`}
                  >
                    <FloatingLabelSelect
                      label="Kinship"
                      options={KINSHIP_OPTIONS}
                    />
                  </FieldWrapper>
                </div>

                <FormLabel className="mt-2">
                  Relative contact information
                </FormLabel>
                <div className="col-span-2">
                  <FieldWrapper
                    control={form.control}
                    name={`relatives.${i}.email`}
                  >
                    <FloatingLabelInput label="Email" id="email" />
                  </FieldWrapper>
                </div>
                <div className="col-span-2">
                  <FieldWrapper
                    control={form.control}
                    name={`relatives.${i}.phone_number`}
                  >
                    <FloatingLabelInput label="Phone" id="phone" />
                  </FieldWrapper>
                </div>
                <div className="col-span-2">
                  <FieldWrapper
                    control={form.control}
                    name={`relatives.${i}.address`}
                  >
                    <FloatingLabelInput label="Address" id="address" />
                  </FieldWrapper>
                </div>
                {i > 0 ? (
                  <div className="col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-sm !p-0"
                      size="sm"
                      onClick={() => remove(i)}
                    >
                      Clear
                    </Button>
                  </div>
                ) : null}
                <div className="col-span-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm !p-0"
                    size="sm"
                    onClick={() =>
                      append({
                        name: '',
                        kinship: '',
                        email: '',
                        phone_number: '',
                        address: '',
                        id: undefined,
                        patient_id: patientId ?? undefined,
                      })
                    }
                  >
                    <Plus /> Add relative
                  </Button>
                </div>
                {field.id ? (
                  <input
                    type="hidden"
                    {...form.register(`relatives.${i}.id`, {
                      valueAsNumber: true,
                    })}
                    value={field.id ?? undefined}
                  />
                ) : null}

                <input
                  type="hidden"
                  {...form.register(`relatives.${i}.patient_id`)}
                  value={field.patient_id ?? patientId}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onSkip}>
            Skip
          </Button>
          <Button type="submit" className="w-1/2">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
