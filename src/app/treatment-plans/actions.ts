'use server';

import { apiClient } from '@/app/actions';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

export const getTreatmentPlans = async () => {
  return await apiClient<TreatmentPlans.GetTreatmentPlans.ResponseBody>(
    '/treatment-plans'
  );
};
