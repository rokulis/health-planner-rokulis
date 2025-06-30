import { useQuery } from '@tanstack/react-query';

import { Patients } from '@/types/swagger/PatientsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const usePatientQuery = (id?: string) => {
  const apiClient = useApiClient();

  const fetchPatient = async () => {
    return await apiClient.get<Patients.GetPatient.ResponseBody>(`/patients/${id}`);
  };

  return useQuery({
    queryKey: ['patients', id],
    queryFn: fetchPatient,
    enabled: !!id,
  });
};
