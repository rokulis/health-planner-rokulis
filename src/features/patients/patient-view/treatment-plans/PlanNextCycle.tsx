import React from 'react';

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
  const { dispatchAction } = useActionContext();
  return (
    <>
      <Button
        size={size}
        onClick={() => dispatchAction('plan_next_cycle', { id })}
        className={className}
      >
        Plan next visits
      </Button>
    </>
  );
};
