// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect, FloatingLabelSelectItem } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { ProtocolCancerTypeEnum } from '@/types/swagger/data-contracts';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FormSchema = z.object({
  name: z.string().min(1, 'Protocol name is required'),
  cancer_type: z.enum(
    Object.values(ProtocolCancerTypeEnum) as [
      ProtocolCancerTypeEnum,
      ...ProtocolCancerTypeEnum[],
    ],
    {
      required_error: 'Please select a cancer type',
    }
  ),
  cycle_duration: z.coerce.number(),
  clinic_id: z.number(),
});

export const AddProtocolForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      cancer_type: ProtocolCancerTypeEnum.BreastCancer,
      cycle_duration: 1,
      clinic_id: 1,
    },
  });

  const onSubmit: SubmitHandler<
    Protocols.CreateProtocol.RequestBody
  > = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Drawer title="New Protocol" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel className="my-4">Protocol information</FormLabel>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <FieldWrapper control={form.control} name="name">
                <FloatingLabelInput id="name" label="Protocol name" />
              </FieldWrapper>
            </div>
            <div className="col-span-4">
              <FieldWrapper control={form.control} name="cancer_type">
                <FloatingLabelSelect label="Drop selection">
                  {Object.keys(ProtocolCancerTypeEnum).map(key => (
                    <FloatingLabelSelectItem
                      key={key}
                      value={
                        ProtocolCancerTypeEnum[
                          key as keyof typeof ProtocolCancerTypeEnum
                        ]
                      }
                    >
                      {key}
                    </FloatingLabelSelectItem>
                  ))}
                </FloatingLabelSelect>
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
          <div className="col-span-6 mt-12 flex justify-end">
            <Button
              type="submit"
              className="w-1/2"
              disabled={!form.formState.isValid}
            >
              Add protocol
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
