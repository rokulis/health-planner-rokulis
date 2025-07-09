'use client';

import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { DateNavigator } from '@/commons/components/date-navigator/DateNavigator';
import { Tabs } from '@/commons/components/tabs/Tabs';
import { Button } from '@/commons/components/ui/button';
import List from '@/commons/icons/svg/list.svg';
import Plus from '@/commons/icons/svg/plus.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';

interface Props {
  children: React.ReactNode;
  visitId?: string;
}

export const ScheduleLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { dispatchAction } = useActionContext();
  const searchParams = useSearchParams();
  const selectedDate =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const pathname = usePathname();
  const currentUrl = `${pathname}?${searchParams.toString()}`;

  const onDateChange = (date: string) => {
    router.push(`/schedule?date=${date}`);
  };

  const TABS = React.useMemo(
    () => [
      {
        label: 'Timeline',
        icon: <Timeline />,
        href: `/schedule?date=${selectedDate}`,
      },
      {
        label: 'List',
        icon: <List />,
        href: `/schedule/list?date=${selectedDate}`,
      },
    ],
    [selectedDate]
  );

  const activeTab =
    TABS.find(tab => tab.href === currentUrl)?.label || 'Timeline';

  return (
    <>
      <PageLayout
        title="Today’s schedule"
        actions={
          <div className="flex items-center gap-2">
            <DateNavigator onDateChange={onDateChange} />
            <Button
              size="sm"
              className="flex gap-2 items-center"
              onClick={() => dispatchAction('treatment_new')}
            >
              <div className="flex gap-1 items-center">
                <Plus />
                Schedule Treatment
              </div>
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          <Tabs tabs={TABS} activeTab={activeTab} />
          {children}
        </div>
      </PageLayout>
    </>
  );
};
