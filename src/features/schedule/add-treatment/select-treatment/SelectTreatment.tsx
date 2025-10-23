'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { secondsToMinutes } from 'date-fns';
import { Plus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';
import { undefined } from 'zod';

import { createTreatmentPlan } from '@/app/treatment-plans/actions';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSearchableSelect } from '@/commons/components/form/FloatingLabelSearchableSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { mapTreatmentRequest } from '@/features/schedule/add-treatment/select-treatment/utils';
import {
  SelectTreatmentFormSchema,
  type SelectTreatmentFormValues,
} from '@/features/schedule/add-treatment/select-treatment/validations';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useDiagnosesQuery } from '@/utils/hooks/useDiagnosesQuery';
import { useSectorsQuery } from '@/utils/hooks/useSectorsQuery';

import { MedicineGroup } from './medicine-group/MedicineGroup';

interface Props {
  protocols?: Protocols.GetProtocols.ResponseBody;
  medicines?: Medicines.GetMedicines.ResponseBody;
  onStepSubmit?: (treatmentPlan: TreatmentPlanResource) => void;
  patientId?: number;
  onSkip?: () => void;
}

export const SelectTreatment: React.FC<Props> = ({
  protocols,
  medicines,
  onStepSubmit,
  patientId,
  onSkip,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const [search, setSearch] = React.useState<string>('');
  const [searchValue] = useDebounce(search, 500);
  const { data: diagnoses } = useDiagnosesQuery(searchValue);
  const { data: sectors } = useSectorsQuery();

  const form = useForm<SelectTreatmentFormValues>({
    resolver: zodResolver(SelectTreatmentFormSchema),
    defaultValues: {
      patient_id: patientId,
      protocol_id: null as unknown as number, // Protocol ID will be set after selection
      cycles: 10,
      days_between_cycles: 7,
      sector_id: undefined as unknown as number,
      diagnosis_id: undefined as unknown as number, // Diagnosis ID will be set after selection
      medicine_groups: [], // No medicine groups until protocol is selected
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'medicine_groups',
  });

  const handleProtocolSelect = (protocolId: string) => {
    const selectedProtocol = protocols?.data?.find(
      p => p.id === Number.parseInt(protocolId)
    );

    if (selectedProtocol) {
      form.setValue('protocol_id', selectedProtocol.id ?? 0);
      form.setValue('days_between_cycles', selectedProtocol.cycle_duration);

      const medicineGroups = selectedProtocol.protocol_medicine_groups?.map(
        group => ({
          protocol_medicine_group_id: group.id,
          duration: secondsToMinutes(group.duration),
          treatment_days: group.treatment_days.toString(),
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
    return startTransition(async () => {
      const request = mapTreatmentRequest(data);
      await createTreatmentPlan(request).then(res => {
        if (res.message) {
          return toast.error(res.message);
        }
        if (res.success) {
          if (typeof onStepSubmit === 'function' && res.data?.id) {
            onStepSubmit(res.data);
          }
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
        <input
          type="hidden"
          {...form.register('patient_id')}
          value={patientId}
        />

        <FormLabel className="mb-2">General information</FormLabel>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="col-span-6">
            <FieldWrapper control={form.control} name="sector_id">
              <FloatingLabelSearchableSelect
                label="Select sector"
                options={
                  (sectors?.data ?? []).map(sector => ({
                    value: String(sector.id),
                    label: `${sector.name}`,
                  })) ?? []
                }
              />
            </FieldWrapper>
          </div>
        </div>

        <FormLabel className="mb-2">Protocol information</FormLabel>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6">
            <FieldWrapper control={form.control} name="protocol_id">
              <FloatingLabelSearchableSelect
                label="Select protocol"
                onValueChange={handleProtocolSelect}
                options={(protocols?.data ?? [])?.map(p => ({
                  value: String(p.id),
                  label: String(p.name),
                }))}
              />
            </FieldWrapper>
          </div>
          <div className="col-span-6">
            <FieldWrapper control={form.control} name="diagnosis_id">
              <FloatingLabelSearchableSelect
                onSearchChange={setSearch}
                label="Diagnosis"
                options={
                  (diagnoses?.data ?? []).map(diagnosis => ({
                    value: String(diagnosis.id),
                    label: `${diagnosis.code}: ${diagnosis.name}`,
                  })) ?? []
                }
              />
            </FieldWrapper>
          </div>
          <div className="col-span-3">
            <FieldWrapper control={form.control} name="cycles">
              <FloatingLabelInput label="Cycles" type="number" />
            </FieldWrapper>
          </div>
          <div className="col-span-3">
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
                form={form}
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

        <div className="p-2 border border-dashed border-black/10 rounded-md">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              append({
                protocol_medicine_group_id: null,
                duration: 0,
                treatment_days: '',
                medicines: [],
              });
            }}
            disabled={!form.getValues().protocol_id}
          >
            <Plus /> Add Medicine Group
          </Button>
        </div>

        <div className="flex justify-end space-x-4 my-6">
          <div className="mt-8 flex justify-end gap-2">
            {typeof onSkip !== 'undefined' ? (
              <Button type="button" variant="ghost" onClick={onSkip}>
                Skip
              </Button>
            ) : null}

            <Button isLoading={isPending} type="submit">
              Save Procedure
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
