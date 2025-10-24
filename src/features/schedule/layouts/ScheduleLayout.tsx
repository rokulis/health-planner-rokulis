'use client';

import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { DateNavigator } from '@/commons/components/date-navigator/DateNavigator';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Tabs } from '@/commons/components/tabs/Tabs';
import { Button } from '@/commons/components/ui/button';
import List from '@/commons/icons/svg/list.svg';
import Plus from '@/commons/icons/svg/plus.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { useSectorsQuery } from '@/utils/hooks/useSectorsQuery';

interface Props {
  children: React.ReactNode;
}

export const ScheduleLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { dispatchAction } = useActionContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: sectors } = useSectorsQuery();

  const selectedDate =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const sectorId = searchParams.get('sector_id');

  const onDateChange = (date: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('date', date);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const onSectorChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set('sector_id', value);
    } else {
      newParams.delete('sector_id');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const TABS = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set('date', selectedDate);
    if (sectorId) {
      params.set('sector_id', sectorId);
    }
    return [
      {
        label: 'Timeline',
        icon: <Timeline />,
        href: `/schedule?${params.toString()}`,
      },
      {
        label: 'List',
        icon: <List />,
        href: `/schedule/list?${params.toString()}`,
      },
    ];
  }, [selectedDate, sectorId]);

  const activeTab =
    TABS.find(tab => pathname === tab.href.split('?')[0])?.label || 'Timeline';

  return (
    <>
      <PageLayout
        title="Today’s schedule"
        actions={
          <div className="flex items-center gap-2">
            <div className="w-48">
              <FloatingLabelSelect
                label="Sector"
                options={[
                  { value: 'all', label: 'All Sectors' },
                  ...(sectors?.data?.map(sector => ({
                    value: sector.id!.toString(),
                    label: sector.name!,
                  })) ?? []),
                ]}
                value={sectorId ?? ''}
                onChange={onSectorChange}
              />
            </div>
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
            <Button
              size="sm"
              className="flex gap-2 items-center"
              onClick={() => dispatchAction('visit_new')}
            >
              <div className="flex gap-1 items-center">
                <Plus />
                Schedule Visit
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
