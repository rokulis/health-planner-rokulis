import { useQuery } from '@tanstack/react-query';

import { Medicines } from '@/types/swagger/MedicinesRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useMedicinesQuery = (search: string = "") => {
  const apiClient = useApiClient();
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('name', search);
  }
  const url = `/medicines?${queryParams.toString()}`;

  const fetchMedicines = async () => {
    return apiClient.get(url).then(res => res.data);
  };

  return useQuery<Medicines.GetMedicines.ResponseBody>({
    queryKey: ['medicines', search],
    queryFn: fetchMedicines,
  });
};
