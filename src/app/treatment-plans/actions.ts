'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { TreatmentCycles } from '@/types/swagger/TreatmentCyclesRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

export const getTreatmentPlans = async () => {
  return await apiClient<TreatmentPlans.GetTreatmentPlans.ResponseBody>(
    '/treatment-plans'
  );
};

export const createTreatmentPlan = async (
  data: TreatmentPlans.CreateTreatmentPlan.RequestBody
) => {
  const res = await apiClient<TreatmentPlans.CreateTreatmentPlan.ResponseBody>(
    '/treatment-plans',
    {
      method: 'POST',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
  }

  return res;
};

export const deleteTreatmentPlan = async (id: number) => {
  const res = await apiClient<TreatmentPlans.DeleteTreatmentPlan.ResponseBody>(
    `/treatment-plans/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag('patient-treatment-plans');
  }
};

export const planVisits = async ({
  id,
  start_date,
  start_time,
}: {
  id: number;
  start_date: string;
  start_time: string;
}) => {
  const res = await apiClient<TreatmentPlans.PlanVisits.ResponseBody>(
    `/treatment-plans/${id}/plan-visits`,
    {
      method: 'POST',
      body: {
        start_date,
        start_time,
      },
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag('patient-treatment-plans');
  }

  return res;
};

export const planNextCycleVisits = async (id: string) => {
  const res = await apiClient<TreatmentCycles.PlanCycle.ResponseBody>(
    `/treatment-plans/${id}/plan-next-cycle`,
    {
      method: 'POST',
    }
  );

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag('patient-treatment-plans');
  }

  return res;
};
