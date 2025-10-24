'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { useRoomsQuery } from '@/features/rooms/hooks/useRoomsQuery';
import { useScheduleQuery } from '@/features/schedule/hooks/useScheduleQuery';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import HospitalTimeline from '@/features/schedule/timeline/Timeline';

export const TimelinePage: React.FC = () => {
  const params = useSearchParams();
  const sectorId = params.get('sector_id')
    ? Number(params.get('sector_id'))
    : undefined;

  const { data: rooms, isLoading } = useRoomsQuery(sectorId);
  const { data: schedule } = useScheduleQuery(
    params.get('date') ?? new Date().toISOString().split('T')[0],
    sectorId,
  );


  return (
    <ScheduleLayout>
      {isLoading ? (
        <PageTopLoader />
      ) : (
        <HospitalTimeline rooms={rooms?.data} schedule={schedule?.data.data} sectorId={sectorId} />
      )}
    </ScheduleLayout>
  );
};
