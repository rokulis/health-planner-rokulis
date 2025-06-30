import { useQuery } from '@tanstack/react-query';

import { Medicines } from '@/types/swagger/MedicinesRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useMedicinesQuery = () => {
  const apiClient = useApiClient();

  const fetchMedicines = async () => {
    return apiClient.get('/medicines').then(res => res.data);
  };

  return useQuery<Medicines.GetMedicines.ResponseBody>({
    queryKey: ['medicines'],
    queryFn: fetchMedicines,
  });
};
