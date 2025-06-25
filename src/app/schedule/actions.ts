'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Schedule } from '@/types/swagger/ScheduleRoute';
import { Visits } from '@/types/swagger/VisitsRoute';

export const getSchedule = async (date: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append('date', date);
  queryParams.append('sector_id', '1');
  const url = `/schedule?${queryParams.toString()}`;

  return apiClient<Schedule.GetSchedule.ResponseBody>(url, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['schedule', `schedule-${date}`],
    },
  });
};

export const getOpenSlots = async (date: string) => {
  return apiClient<Schedule.GetOpenSlots.ResponseBody>(
    `/schedule/open-slots?date=${date}`
  );
};

export const confirmTreatmentPlan = async (id: number) => {
  const res = await apiClient<Schedule.GetSchedule.ResponseBody>(
    `/treatment-plans/${id}/confirm`,
    {
      method: 'POST',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
  }

  return res;
};

export const getVisit = async (visitId: number) => {
  return apiClient<Visits.GetVisit.ResponseBody>(
    `/visits/${visitId}`,
    {
      next: {
        tags: ['schedule', `visit-${visitId}`],
        revalidate: 3600, // Revalidate every hour
      },
    }
  );
};
