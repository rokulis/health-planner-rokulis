'use client';

import React from 'react';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { Tabs } from '@/commons/components/tabs/Tabs';
import { Button } from '@/commons/components/ui/button';
import List from '@/commons/icons/svg/list.svg';
import Plus from '@/commons/icons/svg/plus.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';

interface Props {
  children: React.ReactNode;
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

export const ScheduleLayout: React.FC<Props> = ({ children }) => {
  const [addNew, setAddNew] = React.useState(false);

  return (
    <>
      <Drawer
        title="Schedule treatment "
        isOpen={addNew}
        onClose={() => setAddNew(false)}
      >
        Content
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
