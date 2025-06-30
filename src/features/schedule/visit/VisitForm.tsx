'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { useVisitQuery } from '@/features/schedule/hooks/useVisitQuery';
import VisitCard from '@/features/schedule/visit/VisitCard';

interface Props {
  id: string;
}

export const VisitForm: React.FC<Props> = ({ id }) => {
  const { onClose } = useActionContext();
  const { data: visit } = useVisitQuery(id);

  if (!visit) {
    return <div>No visit data available</div>;
  }

  return (
    <Drawer title={`${visit.data?.patient?.name}`} isOpen={true}>
      <VisitCard visit={visit} onClose={onClose} />
    </Drawer>
  );
};
