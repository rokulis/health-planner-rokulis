'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { useRoomsQuery } from '@/features/rooms/hooks/useRoomsQuery';
import { useScheduleQuery } from '@/features/schedule/hooks/useScheduleQuery';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import HospitalTimeline from '@/features/schedule/timeline/Timeline';

interface Props {
  visitId?: string;
}

export const TimelinePage: React.FC<Props> = ({ visitId }) => {
  const params = useSearchParams();

  const { data: rooms, isLoading } = useRoomsQuery();
  const { data: schedule } = useScheduleQuery(
    params.get('date') ?? new Date().toISOString().split('T')[0]
  );

  return (
    <ScheduleLayout visitId={visitId}>
      {isLoading ? (
        <PageTopLoader />
      ) : (
        <HospitalTimeline rooms={rooms?.data} schedule={schedule?.data.data} />
      )}
    </ScheduleLayout>
  );
};
