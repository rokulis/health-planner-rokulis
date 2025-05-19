'use client';

import React from 'react';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { Tabs } from '@/commons/components/tabs/Tabs';
import { Button } from '@/commons/components/ui/button';
import List from '@/commons/icons/svg/list.svg';
import Plus from '@/commons/icons/svg/plus.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { AddTreatment } from '@/features/schedule/add-treatment/AddTreatment';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  children: React.ReactNode;
  patients: Patients.GetPatients.ResponseBody;
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
}

const TABS = [
  {
    label: 'Timeline',
    icon: <Timeline />,
    href: '/schedule',
  },
  {
    label: 'List',
    icon: <List />,
    href: '/schedule/list',
  },
];

export const ScheduleLayout: React.FC<Props> = ({
  children,
  patients,
  protocols,
  medicines,
}) => {
  const [addNew, setAddNew] = React.useState(false);

  return (
    <>
      <Drawer
        title="Schedule treatment "
        isOpen={addNew}
        onClose={() => setAddNew(false)}
      >
        <AddTreatment
          medicines={medicines}
          patients={patients}
          protocols={protocols}
        />
      </Drawer>
      <PageLayout
        title="Today’s schedule"
        actions={
          <Button
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => setAddNew(true)}
          >
            <Plus />
            Schedule Treatment
          </Button>
        }
      >
        <div className="flex flex-col">
          <Tabs tabs={TABS} />
          {children}
        </div>
      </PageLayout>
    </>
  );
};
