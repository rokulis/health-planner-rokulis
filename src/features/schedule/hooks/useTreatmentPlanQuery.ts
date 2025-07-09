import { useQuery } from '@tanstack/react-query';

import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useTreatmentPlanQuery = (id?: number) => {
  const apiClient = useApiClient();
  const fetchTreatmentPlan = async () => {
    return await apiClient
      .get<TreatmentPlans.GetTreatmentPlan.ResponseBody>(
        `/treatment-plans/${id}`
      )
      .then(res => res.data);
  };

  return useQuery({
    queryKey: ['treatment-plans', id],
    queryFn: fetchTreatmentPlan,
    enabled: !!id,
  });
};
