import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { planNextCycleVisits } from '@/app/treatment-plans/actions';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';

interface Props {
  id: string;
  onSuccess?: () => void;
  size?: 'sm' | 'default';
  className?: string;
}

export const PlanNextCycle: React.FC<Props> = ({
  id,
  onSuccess,
  size = 'sm',
  className,
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = React.useTransition();

  const handlePlanNextVisits = () => {
    return startTransition(async () => {
      return planNextCycleVisits(id).then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          queryClient.invalidateQueries({
            queryKey: ['schedule'],
          });
          queryClient.invalidateQueries({
            queryKey: ['treatment-plans'],
          });
          queryClient.invalidateQueries({
            queryKey: ['visits'],
          });
          toast.success('Next visits planned successfully');
          onSuccess?.();
        }
      });
    });
  };

  return (
    <>
      {isPending ? <PageTopLoader /> : null}
      <Button
        size={size}
        onClick={handlePlanNextVisits}
        className={className}
        disabled={isPending}
      >
        Plan next visits
      </Button>
    </>
  );
};
