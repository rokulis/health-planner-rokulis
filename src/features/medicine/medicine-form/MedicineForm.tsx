import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createMedicine, updateMedicine } from '@/app/medicine/actions';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { TimeInput } from '@/commons/components/form/TimeInput';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { medicineSchema } from '@/features/medicine/medicine-form/validations';
import { CreateMedicineProcedureEnum } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { MedicineProcedure } from '@/utils/factory';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  medicine?: Medicines.GetMedicine.ResponseBody;
}

export const MedicineForm: React.FC<Props> = ({
  isOpen,
  onClose,
  medicine,
}) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof medicineSchema>>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: medicine?.data?.name ?? '',
      atc_code: medicine?.data?.atc_code ?? '',
      procedure: CreateMedicineProcedureEnum.Iv,
      default_time: medicine?.data?.default_time ?? '',
    },
  });

  const onSubmit: SubmitHandler<
    Medicines.CreateMedicine.RequestBody | Medicines.UpdateMedicine.RequestBody
  > = data => {
    return startTransition(async () => {
      if (medicine?.data?.id) {
        return updateMedicine(
          medicine.data.id,
          data as Medicines.UpdateMedicine.RequestBody
        ).then(res => {
          if (res.message) {
            toast.error(res.message);
            return;
          } else {
            toast.success('Medicine updated successfully');
            onClose();
          }
        });
      }

      return createMedicine(data as Medicines.CreateMedicine.RequestBody).then(
        res => {
          if (res.message) {
            toast.error(res.message);
            return;
          } else {
            toast.success('Medicine added successfully');
            onClose();
          }
        }
      );
    });
  };

  return (
    <Drawer title="Medicine Form" isOpen={isOpen} onClose={onClose}>
      {isPending ? <PageTopLoader /> : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div id="form">
            <FormLabel className="my-4">Medicine information</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="name">
                  <FloatingLabelInput label="Medicine name" id="name" />
                </FieldWrapper>
              </div>
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="atc_code">
                  <FloatingLabelInput label="ATC code" />
                </FieldWrapper>
              </div>
              <div className="col-span-1">
                <FieldWrapper control={form.control} name="procedure">
                  <FloatingLabelSelect
                    label="Procedure"
                    options={Object.keys(CreateMedicineProcedureEnum).map(
                      key => ({
                        value:
                          CreateMedicineProcedureEnum[
                            key as keyof typeof CreateMedicineProcedureEnum
                          ],
                        label:
                          MedicineProcedure[
                            CreateMedicineProcedureEnum[
                              key as keyof typeof CreateMedicineProcedureEnum
                            ]
                          ],
                      })
                    )}
                  />
                </FieldWrapper>
              </div>
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="default_time">
                  <TimeInput label="MM:SS" />
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
              {medicine?.data?.id ? 'Update Medicine' : 'Add Medicine'}
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
