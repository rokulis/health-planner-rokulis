import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { planNextCycleVisits } from '@/app/treatment-plans/actions';
import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Button } from '@/commons/components/ui/button';

interface Props {
  id: string;
  onSuccess?: () => void;
  size?: 'sm' | 'default';
  className?: string;
}

export const PlanNextCycle: React.FC<Props> = ({
  size = 'sm',
  id,
  className,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const { dispatchAction } = useActionContext();
  const queryClient = useQueryClient();

  const revalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['schedule'],
    });
    await queryClient.invalidateQueries({
      queryKey: ['treatment-plans'],
    });
    await queryClient.invalidateQueries({
      queryKey: ['visits'],
    });
  };

  const handleButtonClick = async () => {
    return startTransition(async () => {
      const res = await planNextCycleVisits(id);
      await revalidateCache();
      if (res.success) {
        toast.success('Next visits planned successfully');

        if (res.data) {
          dispatchAction('plan_next_cycle', { id });
        }
      }
    });
  };

  return (
    <>
      <Button
        size={size}
        isLoading={isPending}
        onClick={handleButtonClick}
        className={className}
      >
        Plan next visits
      </Button>
    </>
  );
};
