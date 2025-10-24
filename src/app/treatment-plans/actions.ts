'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

export const getPatientTreatmentPlans = async (patientId: number) => {
  return await apiClient<TreatmentPlans.GetPatientTreatmentPlans.ResponseBody>(
    `/treatment-plans/patient/${patientId}`,
    {
      next: {
        tags: ['patient-treatment-plans', `patient-treatment-plans-${patientId}`],
      },
    }
  );
};

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

export const planNextCycleVisits = async (
  id: string,
  data?: TreatmentPlans.PlanNextCycle.RequestBody
) => {
  const res = await apiClient<
    TreatmentPlans.PlanNextCycle.ResponseBody,
    TreatmentPlans.PlanNextCycle.RequestBody
  >(`/treatment-plans/${id}/plan-next-cycle`, {
    method: 'POST',
    body: data,
  });

  if (res.success) {
    revalidateTag('schedule');
    revalidateTag('treatment-plans');
    revalidateTag('patient-treatment-plans');
  }

  return res;
};
