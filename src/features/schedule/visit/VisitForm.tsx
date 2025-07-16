'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { useVisitQuery } from '@/features/schedule/hooks/useVisitQuery';
import VisitCard from '@/features/schedule/visit/VisitCard';
import { VisitPreview } from '@/features/schedule/visit/VisitPreview';
import { VisitTreatmentStatus } from '@/types/swagger/data-contracts';

interface Props {
  id: string;
}

export const VisitForm: React.FC<Props> = ({ id }) => {
  const { onClose } = useActionContext();
  const { data: visit, isLoading } = useVisitQuery(id);
  const [showPreview, setShowPreview] = React.useState(false);

  React.useEffect(() => {
    setShowPreview(
      !!visit?.data?.visit_treatments?.every(
        t => t.status === VisitTreatmentStatus.Pending
      )
    );
  }, [visit]);

  if (!visit) {
    return null;
  }

  return (
    <Drawer title={`${visit.data?.patient?.name}`} isOpen={true}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {showPreview ? (
            <VisitPreview
              onClose={onClose}
              onStart={() => setShowPreview(false)}
              visit={visit}
            />
          ) : (
            <VisitCard visit={visit} onClose={onClose} />
          )}
        </>
      )}
    </Drawer>
  );
};
