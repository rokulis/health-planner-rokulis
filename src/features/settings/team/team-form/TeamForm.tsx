import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { sendInvitation } from '@/app/settings/actions';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { teamInvitationSchema } from '@/features/settings/team/team-form/validations';
import { CreateInvitationRoleEnum } from '@/types/swagger/data-contracts';
import { Invitations } from '@/types/swagger/InvitationsRoute';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof teamInvitationSchema>>({
    resolver: zodResolver(teamInvitationSchema),
    defaultValues: {
      email: '',
      role: CreateInvitationRoleEnum.Admin,
    },
  });

  const onSubmit: SubmitHandler<
    Invitations.CreateInvitation.RequestBody
  > = data => {
    return startTransition(async () => {
      return sendInvitation(data).then(res => {
        if (res.message) {
          toast.error(res.message);
          return;
        } else {
          toast.success('Invitation sent successfully');
          onClose();
        }
      });
    });
  };

  return (
    <Drawer title="Add new team member" isOpen={isOpen} onClose={onClose}>
      {isPending ? <PageTopLoader /> : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div id="form">
            <FormLabel className="my-4">Member information</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="email">
                  <FloatingLabelInput label="Email" id="email" />
                </FieldWrapper>
              </div>
              <div className="col-span-2">
                <FieldWrapper control={form.control} name="role">
                  <FloatingLabelSelect
                    label="Role"
                    options={Object.keys(CreateInvitationRoleEnum).map(key => ({
                      value:
                        CreateInvitationRoleEnum[
                          key as keyof typeof CreateInvitationRoleEnum
                        ],
                      label: key.replace(/([A-Z])/g, ' $1').trim(),
                    }))}
                  />
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
              Send Invitation
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
