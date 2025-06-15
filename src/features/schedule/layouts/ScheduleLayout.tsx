'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { Tabs } from '@/commons/components/tabs/Tabs';
import { Button } from '@/commons/components/ui/button';
import { DateNavigator } from '@/commons/date-navigator/DateNavigator';
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
  isDefaultOpen?: boolean;
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
  isDefaultOpen,
}) => {
  const router = useRouter();
  const [addNew, setAddNew] = React.useState(isDefaultOpen ?? false);

  const onClose = () => {
    setAddNew(false);
    router.push('/schedule');
  };

  const onDateChange = (date: string) => {
    router.push(`/schedule?date=${date}`);
  };

  return (
    <>
      <Drawer title="Schedule treatment" isOpen={addNew} onClose={onClose}>
        <AddTreatment
          medicines={medicines}
          patients={patients}
          protocols={protocols}
        />
      </Drawer>
      <PageLayout
        title="Today’s schedule"
        actions={
          <div className="flex items-center gap-2">
            <DateNavigator onDateChange={onDateChange} />
            <Button
              size="sm"
              className="flex gap-2 items-center"
              asChild={true}
            >
              <Link href="/schedule/new">
                <Plus />
                Schedule Treatment
              </Link>
            </Button>
          </div>
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
