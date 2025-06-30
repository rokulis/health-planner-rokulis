'use client';

import React from 'react';

import { Plus, X } from 'lucide-react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { Button } from '@/commons/components/ui/button';
import { FormLabel } from '@/commons/components/ui/form';
import { MedicineField } from '@/features/protocols/add-protocol/MedicineField';
import { protocolSchema } from '@/features/protocols/add-protocol/validations';
import { MedicineProcedureEnum } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';

interface MedicineGroupProps {
  index: number;
  onRemove: () => void;
  medicines?: Medicines.GetMedicines.ResponseBody;
  form: UseFormReturn<z.infer<typeof protocolSchema>>;
}

export function MedicineGroup({
  index,
  onRemove,
  medicines,
  form,
}: MedicineGroupProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `medicine_groups.${index}.medicines`,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="hidden"
          {...form.register(`medicine_groups.${index}.protocol_id`)}
          value="1"
        />

        <FormLabel className="mb-2">{index + 1}. Medicine Group</FormLabel>
        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="text-black/80"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <div className="col-span-2">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${index}.duration`}
          >
            <FloatingLabelInput label="Duration (minutes)" />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${index}.treatment_days`}
            description="Separated by comma. ie: 1,4,8"
          >
            <FloatingLabelInput label="Treatment Days" />
          </FieldWrapper>
        </div>
      </div>

      {fields.map((field, medicineIndex) => (
        <MedicineField
          key={field.id}
          groupIndex={index}
          medicineIndex={medicineIndex}
          form={form}
          onRemove={() => remove(medicineIndex)}
          medicines={medicines}
        />
      ))}

      <Button
        type="button"
        variant="ghost"
        className="text-sm"
        onClick={() => {
          append({
            protocol_medicine_group_id: 0,
            medicine_id: 0,
            dose: '',
            comments: '',
            medicine: {
              atc_code: '',
              procedure: MedicineProcedureEnum.Iv,
            },
          });
        }}
      >
        <Plus size={16} /> Add Medicine
      </Button>
    </>
  );
}
