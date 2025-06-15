import React from 'react';

import { Tabs } from '@/commons/components/tabs/Tabs';
import List from '@/commons/icons/svg/list.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';

const TABS = [
  {
    label: 'Personal Info',
    icon: <Timeline />,
    href: '/settings',
  },
  {
    label: 'Team',
    icon: <List />,
    href: '/settings/team',
  },
];

export const SettingsLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <PageLayout title="Settings">
      <div className="flex flex-col">
        <Tabs tabs={TABS} />
        {children}
      </div>
    </PageLayout>
  );
};
