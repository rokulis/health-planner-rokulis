import { useQuery } from '@tanstack/react-query';

import { Visits } from '@/types/swagger/VisitsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useVisitQuery = (id?: string) => {
  const apiClient = useApiClient();

  const fetchVisit = async () => {
    return apiClient.get(`/visits/${id}`);
  };

  return useQuery<Visits.GetVisit.ResponseBody>({
    queryKey: ['visits', id],
    queryFn: fetchVisit,
    enabled: !!id,
  });
};
