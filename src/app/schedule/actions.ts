'use server';

import { apiClient } from '@/app/actions';
import { Schedule } from '@/types/swagger/ScheduleRoute';

export const getSchedule = async (date: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append('date', date);
  const url = `/schedule?${queryParams.toString()}`;

  return apiClient<Schedule.GetSchedule.ResponseBody>(url);
};

export const getOpenSlots = async (date: string) => {
  return apiClient<Schedule.GetOpenSlots.ResponseBody>(
    `/schedule/open-slots?date=${date}`
  );
};
