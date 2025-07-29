import React from 'react';

import { toast } from 'sonner';

import { planNextCycleVisits } from '@/app/treatment-plans/actions';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';

interface Props {
  id: string;
  onSuccess?: () => void;
}

export const PlanNextCycle: React.FC<Props> = ({ id, onSuccess }) => {
  const [isPending, startTransition] = React.useTransition();

  const handlePlanNextVisits = () => {
    return startTransition(async () => {
      return planNextCycleVisits(id).then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          toast.success('Next visits planned successfully');
          onSuccess?.();
        }
      });
    });
  };

  return (
    <>
      {isPending ? <PageTopLoader /> : null}
      <Button size="sm" onClick={handlePlanNextVisits} disabled={isPending}>
        Plan next visits
      </Button>
    </>
  );
};
