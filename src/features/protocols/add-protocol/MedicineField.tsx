'use client';

import React from 'react';

import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { FormLabel } from '@/commons/components/ui/form';
import { Textarea } from '@/commons/components/ui/textarea';
import { protocolSchema } from '@/features/protocols/add-protocol/validations';
import { MedicineProcedureEnum } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';

interface MedicineFieldProps {
  groupIndex: number;
  medicineIndex: number;
  form: UseFormReturn<z.infer<typeof protocolSchema>>;
  onRemove: () => void;
  medicines: Medicines.GetMedicines.ResponseBody;
}

export function MedicineField({
  groupIndex,
  medicineIndex,
  form,
  onRemove,
  medicines,
}: MedicineFieldProps) {
  return (
    <div className="pt-4 mt-2">
      <div className="flex justify-between items-center">
        <FormLabel className="mb-2">
          {groupIndex + 1}.{medicineIndex + 1} Medicine information
        </FormLabel>
        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="text-black/80"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {medicines.data && medicines.data.length > 0 ? (
          <div className="col-span-6">
            <FieldWrapper
              control={form.control}
              name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.medicine_id`}
            >
              <FloatingLabelSelect
                label="Select medicine"
                options={medicines.data.map(m => ({
                  value: String(m.id),
                  label: String(m.name),
                }))}
              />
            </FieldWrapper>
          </div>
        ) : null}

        <div className="col-span-2">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.medicine.atc_code`}
          >
            <FloatingLabelInput label="ATC Code" />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.medicine.procedure`}
          >
            <FloatingLabelSelect
              label="Procedure"
              options={Object.keys(MedicineProcedureEnum).map(key => ({
                value:
                  MedicineProcedureEnum[
                    key as keyof typeof MedicineProcedureEnum
                  ],
                label: key.replace(/([A-Z])/g, ' $1').trim(),
              }))}
            />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.dose`}
          >
            <FloatingLabelInput label="Dose" type="text" />
          </FieldWrapper>
        </div>
        <div className="col-span-6">
          <FieldWrapper
            control={form.control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.comments`}
          >
            <Textarea />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}
