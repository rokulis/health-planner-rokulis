'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';

interface Props {
  children: React.ReactNode;
}

export const PatientsLayout: React.FC<Props> = ({ children }) => {
  const { dispatchAction } = useActionContext();
  return (
    <>
      <PageLayout
        title="Patients"
        searchEnabled={true}
        actions={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex gap-2 items-center"
              asChild={true}
              onClick={() => dispatchAction('patient_new')}
            >
              <div className="flex gap-1 items-center">
                <Plus />
                Add Patient
              </div>
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">{children}</div>
      </PageLayout>
    </>
  );
};
