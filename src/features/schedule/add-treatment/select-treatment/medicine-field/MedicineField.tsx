'use client';

import { X } from 'lucide-react';
import type { Control } from 'react-hook-form';

import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { FormLabel } from '@/commons/components/ui/form';
import { Textarea } from '@/commons/components/ui/textarea';
import { SelectTreatmentFormValues } from '@/features/schedule/add-treatment/select-treatment/validations';
import { Medicines } from '@/types/swagger/MedicinesRoute';

interface MedicineFieldProps {
  groupIndex: number;
  medicineIndex: number;
  control: Control<SelectTreatmentFormValues>;
  onRemove: () => void;
  medicines: Medicines.GetMedicines.ResponseBody;
}

export function MedicineField({
  groupIndex,
  medicineIndex,
  control,
  onRemove,
  medicines,
}: MedicineFieldProps) {
  return (
    <div className="pt-4 mt-2">
      <div className="flex justify-between items-center">
        <FormLabel className="mb-2">
          {medicineIndex + 1}. Medicine information
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
        <div className="col-span-6">
          <FieldWrapper
            control={control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.medicine_id`}
          >
            <FloatingLabelSelect
              label="Select medicine"
              options={(medicines.data ?? [])?.map(m => ({
                value: String(m.id),
                label: String(m.name),
              }))}
            />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.atc_code`}
          >
            <FloatingLabelInput label="ATC Code" />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.procedure`}
          >
            <FloatingLabelInput label="Procedure" />
          </FieldWrapper>
        </div>
        <div className="col-span-2">
          <FieldWrapper
            control={control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.dose`}
          >
            <FloatingLabelInput label="Dose" type="text" />
          </FieldWrapper>
        </div>
        <div className="col-span-6">
          <FieldWrapper
            control={control}
            name={`medicine_groups.${groupIndex}.medicines.${medicineIndex}.comment`}
          >
            <Textarea />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}
