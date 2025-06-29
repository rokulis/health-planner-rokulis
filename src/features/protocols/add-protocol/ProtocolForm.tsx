import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { minutesToSeconds, secondsToMinutes } from 'date-fns';
import { Plus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

import { createProtocol, updateProtocol } from '@/app/protocols/actions';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSearchableSelect } from '@/commons/components/form/FloatingLabelSearchableSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { MedicineGroup } from '@/features/protocols/add-protocol/MedicineGroup';
import { protocolSchema } from '@/features/protocols/add-protocol/validations';
import { MedicineProcedureEnum } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useDiagnosesQuery } from '@/utils/hooks/useDiagnosesQuery';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicines.GetMedicines.ResponseBody;
  protocol?: Protocols.GetProtocol.ResponseBody;
}

const transformTreatmentDaysToArrayOfNumber = (
  data: z.infer<typeof protocolSchema>
) => {
  return {
    ...data,
    medicine_groups: data.medicine_groups.map(mg => ({
      ...mg,
      duration: minutesToSeconds(mg.duration),
      treatment_days: mg.treatment_days
        .split(',')
        .map(day => parseInt(day.trim(), 10))
        .filter(day => !isNaN(day)),
    })),
  };
};

export const ProtocolForm: React.FC<Props> = ({
  isOpen,
  onClose,
  medicines,
  protocol,
}) => {
  const [search, setSearch] = React.useState<string>('');
  const [searchValue] = useDebounce(search, 500);
  const { data: diagnoses } = useDiagnosesQuery(searchValue);

  const form = useForm({
    resolver: zodResolver(protocolSchema),
    defaultValues: {
      name: protocol?.data?.name ?? '',
      clinic_id: protocol?.data?.clinic_id ?? 1,
      diagnosis_id: protocol?.data?.diagnosis?.id ?? undefined,
      cycle_duration: protocol?.data?.cycle_duration ?? 1,
      medicine_groups: protocol?.data?.protocol_medicine_groups?.map(mg => ({
        ...mg,
        duration: secondsToMinutes(mg.duration) ?? 1,
        treatment_days: mg.treatment_days.join(',') ?? '',
        medicines:
          mg.protocol_medicines?.map(pm => ({
            ...pm,
            medicine_id: pm.medicine?.id,
            comments: pm.comments ?? '',
            medicine: {
              atc_code: pm.medicine?.atc_code,
              procedure: pm.medicine?.procedure ?? MedicineProcedureEnum.Iv,
            },
          })) ?? [],
      })) ?? [
        {
          protocol_id: 1,
          duration: 1,
          treatment_days: '',
          medicines: [
            {
              protocol_medicine_group_id: 0,
              dose: '',
              comments: '',
              medicine: {
                atc_code: '',
              },
            },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'medicine_groups',
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof protocolSchema>
  > = async data => {
    const transformedData = transformTreatmentDaysToArrayOfNumber(data);

    if (protocol?.data?.id) {
      return updateProtocol(protocol.data.id, transformedData).then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          toast.success('Protocol updated successfully');
          form.reset();
          onClose();
        }
      });
    }
    return createProtocol(transformedData).then(res => {
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success('Protocol added successfully');
        form.reset();
        onClose();
      }
    });
  };

  return (
    <Drawer title="Protocol Form" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" {...form.register('clinic_id')} value="1" />

          <FormLabel className="my-4">Protocol information</FormLabel>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <FieldWrapper control={form.control} name="name">
                <FloatingLabelInput id="name" label="Protocol name" />
              </FieldWrapper>
            </div>
            <div className="col-span-4">
              <FieldWrapper control={form.control} name="diagnosis_id">
                <FloatingLabelSearchableSelect
                  onSearchChange={setSearch}
                  label="Diagnosis"
                  options={
                    (diagnoses?.data ?? []).map(diagnosis => ({
                      value: String(diagnosis.id),
                      label: diagnosis.name,
                    })) ?? []
                  }
                />
              </FieldWrapper>
            </div>
            <div className="col-span-2">
              <FieldWrapper control={form.control} name="cycle_duration">
                <FloatingLabelInput
                  id="cycles"
                  label="Default cycles"
                  type="number"
                />
              </FieldWrapper>
            </div>
          </div>

          {fields.length > 0
            ? fields.map((_field, index) => (
              <div
                className="p-2 mt-4 border border-black/10 rounded-md"
                key={index}
              >
                <MedicineGroup
                  form={form}
                  index={index}
                  onRemove={remove}
                  medicines={medicines}
                />
              </div>
            ))
            : null}

          <div className="p-2 mt-4 border border-dashed border-black/10 rounded-md">
            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                append({
                  duration: 1,
                  treatment_days: '',
                  protocol_id: 0,
                  medicines: [
                    {
                      medicine_id: 0,
                      protocol_medicine_group_id: 0,
                      dose: '',
                      comments: '',
                      medicine: {
                        atc_code: '',
                        procedure: MedicineProcedureEnum.Iv,
                      },
                    },
                  ],
                })
              }
            >
              <Plus /> Add medicine group
            </Button>
          </div>
          <div className="col-span-6 mt-12 flex justify-end">
            <Button type="submit" className="w-1/2">
              {protocol?.data?.id ? 'Update Protocol' : 'Add Protocol'}
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
