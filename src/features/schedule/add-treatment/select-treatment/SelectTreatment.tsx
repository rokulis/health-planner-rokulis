'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { createTreatmentPlan } from '@/app/treatment-plans/actions';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { mapTreatmentRequest } from '@/features/schedule/add-treatment/select-treatment/utils';
import {
  SelectTreatmentFormSchema,
  type SelectTreatmentFormValues,
} from '@/features/schedule/add-treatment/select-treatment/validations';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

import { MedicineGroup } from './medicine-group/MedicineGroup';

interface Props {
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
  onStepSubmit?: () => void;
}

export const SelectTreatment: React.FC<Props> = ({
  protocols,
  medicines,
  onStepSubmit,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patient_id = searchParams.has('patient')
    ? parseInt(searchParams.get('patient') as string, 10)
    : 1;

  const form = useForm<SelectTreatmentFormValues>({
    resolver: zodResolver(SelectTreatmentFormSchema),
    defaultValues: {
      patient_id: patient_id,
      protocol_id: 0, // No protocol selected initially
      cycles: 10,
      days_between_cycles: 7,
      sector_id: 1,
      tlk_code: 'C00-D48',
      medicine_groups: [], // No medicine groups until protocol is selected
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'medicine_groups',
  });

  const handleProtocolSelect = (protocolId: string) => {
    const selectedProtocol = protocols.data?.find(
      p => p.id === Number.parseInt(protocolId)
    );

    if (selectedProtocol) {
      form.setValue('protocol_id', selectedProtocol.id ?? 0);
      form.setValue('days_between_cycles', selectedProtocol.cycle_duration);

      // Transform medicine groups to match form structure
      const medicineGroups = selectedProtocol.protocol_medicine_groups?.map(
        group => ({
          protocol_medicine_group_id: group.id,
          duration: group.duration,
          treatment_days: group.treatment_days,
          medicines: group.protocol_medicines?.map(medicine => {
            // Parse dose to extract number and unit
            const doseMatch = medicine.dose.match(/^(\d+)(\w+)$/);
            const doseValue = doseMatch
              ? Number.parseInt(doseMatch[1])
              : Number.parseInt(medicine.dose);
            const doseUnit = doseMatch ? doseMatch[2] : 'mg';

            return {
              medicine_id: medicine.medicine_id,
              medicine_name: medicine.medicine?.name,
              atc_code: medicine.medicine?.atc_code,
              procedure: medicine.medicine?.procedure,
              dose: doseValue,
              dose_unit: doseUnit,
              comment: medicine.comments,
            };
          }),
        })
      );

      // @ts-expect-error Non-null assertion
      replace(medicineGroups);
    }
  };

  const onSubmit: SubmitHandler<SelectTreatmentFormValues> = async data => {
    const request = mapTreatmentRequest(data);
    await createTreatmentPlan(request).then(res => {
      if (res.success) {
        router.push(`?patient=${patient_id}&treatment=${res.data?.id}`);
        if (typeof onStepSubmit === 'function') {
          onStepSubmit();
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
        <input type="hidden" {...form.register('sector_id')} value="1" />
        <input
          type="hidden"
          {...form.register('patient_id')}
          value={patient_id}
        />

        <FormLabel className="mb-2">Protocol information</FormLabel>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6">
            <FieldWrapper control={form.control} name="protocol_id">
              <FloatingLabelSelect
                label="Select protocol"
                onValueChange={handleProtocolSelect}
                options={(protocols.data ?? [])?.map(p => ({
                  value: String(p.id),
                  label: String(p.name),
                }))}
              />
            </FieldWrapper>
          </div>

          <div className="col-span-2">
            <FieldWrapper control={form.control} name="tlk_code">
              <FloatingLabelInput label="TLK code" />
            </FieldWrapper>
          </div>
          <div className="col-span-2">
            <FieldWrapper control={form.control} name="cycles">
              <FloatingLabelInput label="Cycles" type="number" />
            </FieldWrapper>
          </div>
          <div className="col-span-2">
            <FieldWrapper control={form.control} name="days_between_cycles">
              <FloatingLabelInput label="Days between" type="number" />
            </FieldWrapper>
          </div>
        </div>

        {fields.length > 0 ? (
          fields.map((field, index) => (
            <div
              className="border border-gray p-2 rounded-md my-8"
              key={field.id}
            >
              <MedicineGroup
                index={index}
                control={form.control}
                onRemove={() => remove(index)}
                medicines={medicines}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-sm py-8 text-black/80">
            Select a protocol to load medicine groups
          </div>
        )}

        <div className="flex justify-end space-x-4 my-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              append({
                protocol_medicine_group_id: fields.length + 1,
                duration: 0,
                treatment_days: [0],
                medicines: [],
              });
            }}
            disabled={!form.getValues().protocol_id}
          >
            <Plus /> Add Medicine Group
          </Button>
          <Button type="submit">Save Procedure</Button>
        </div>
      </form>
    </Form>
  );
};
