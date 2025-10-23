'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { VisitTreatmentStatus } from '@/types/swagger/data-contracts';
import { Schedule } from '@/types/swagger/ScheduleRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';
import { Visits } from '@/types/swagger/VisitsRoute';

export const getSchedule = async (date: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append('date', date);
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

export const getTreatmentPlan = async (id?: number) => {
  return apiClient<TreatmentPlans.GetTreatmentPlan.ResponseBody>(
    `/treatment-plans/${id}`,
    {
      next: {
        tags: [`treatment-plan-${id}`],
        revalidate: 3600,
      },
    }
  );
};

export const confirmTreatmentPlanCycle = async (id: number) => {
  const res = await apiClient<Schedule.GetSchedule.ResponseBody>(
    `/treatment-plans/${id}/confirm-cycle`,
    {
      method: 'POST',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag('patient-treatment-plans');
    revalidateTag(`treatment-plan-${id}`);
  }

  return res;
};

export const getVisit = async (visitId: number) => {
  return apiClient<Visits.GetVisit.ResponseBody>(`/visits/${visitId}`, {
    next: {
      tags: ['schedule', `visit-${visitId}`],
      revalidate: 3600, // Revalidate every hour
    },
  });
};

export const changeTreatmentStatus = async (
  visitId: number,
  treatmentId: number,
  status: VisitTreatmentStatus
) => {
  const res = await apiClient<
    Visits.ChangeVisitTreatmentStatus.ResponseBody,
    Visits.ChangeVisitTreatmentStatus.RequestBody
  >(`/visits/${visitId}/treatments/${treatmentId}/change-status`, {
    method: 'POST',
    body: {
      status,
    },
  });

  if (res.success) {
    revalidateTag(`visit-${visitId}`);
    revalidateTag('schedule');
    revalidateTag('patient-treatment-plans');
  }

  return res;
};

export const rescheduleVisit = async (
  id: string,
  data: Visits.RescheduleVisit.RequestBody
) => {
  const res = await apiClient<
    Visits.RescheduleVisit.ResponseBody,
    Visits.RescheduleVisit.RequestBody
  >(`/visits/${id}/reschedule`, {
    method: 'POST',
    body: data,
  });

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag(`visit-${id}`);
    revalidateTag('patient-treatment-plans');
  }

  return res;
};

export const finishTreatmentPlan = async (id: number) => {
  const res = await apiClient<TreatmentPlans.FinishTreatmentPlan.ResponseBody>(
    `/treatment-plans/${id}/finish`,
    {
      method: 'POST',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag(`treatment-plan-${id}`);
    revalidateTag('patient-treatment-plans');
  }

  return res;
};

export const cancelTreatmentPlan = async (id: number) => {
  const res = await apiClient<TreatmentPlans.CancelTreatmentPlan.ResponseBody>(
    `/treatment-plans/${id}/cancel`,
    {
      method: 'DELETE',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag(`treatment-plan-${id}`);
    revalidateTag('patient-treatment-plans');
  }

  return res;
};
