import React from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  cancelTreatmentPlan,
  finishTreatmentPlan,
} from '@/app/schedule/actions';
import { useConfirm } from '@/commons/components/confirm/hooks/useConfirm';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  activeTreatmentPlan: TreatmentPlans.GetTreatmentPlan.ResponseBody;
}

export const PlanActions: React.FC<Props> = ({ activeTreatmentPlan }) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = React.useTransition();
  const { showConfirmation } = useConfirm();

  const handleFinish = async () => {
    const confirmed = await showConfirmation({
      title: 'Finish Treatment Plan',
      message: `Are you sure you want to finish this treatment plan? This action cannot be undone.`,
      proceedText: 'Finish',
      cancelText: 'Cancel',
    });

    return startTransition(() => {
      if (!activeTreatmentPlan.data?.id) {
        return;
      }
      if (confirmed) {
        return finishTreatmentPlan(activeTreatmentPlan.data?.id).then(res => {
          if (res.message) {
            toast.error(res.message);
          } else {
            queryClient.invalidateQueries({
              queryKey: ['schedule'],
            });
            toast.success('Treatment plan finished successfully');
          }
        });
      }
    });
  };

  const handleCancel = async () => {
    const confirmed = await showConfirmation({
      title: 'Cancel Treatment Plan',
      message: `Are you sure you want to cancel this treatment plan? This action cannot be undone.`,
      proceedText: 'Proceed',
      cancelText: 'Cancel',
    });

    return startTransition(() => {
      if (!activeTreatmentPlan.data?.id) {
        return;
      }
      if (confirmed) {
        return cancelTreatmentPlan(activeTreatmentPlan.data?.id).then(res => {
          if (res.message) {
            toast.error(res.message);
          } else {
            queryClient.invalidateQueries({
              queryKey: ['schedule'],
            });
            toast.success('Treatment plan cancelled successfully');
          }
        });
      }
    });
  };

  return (
    <>
      {isPending ? <PageTopLoader /> : null}
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              return handleFinish();
            }}
          >
            Finish
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-danger"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              return handleCancel();
            }}
          >
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
