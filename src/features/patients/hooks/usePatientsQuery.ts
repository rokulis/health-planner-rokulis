import { useQuery } from '@tanstack/react-query';

import { Patients } from '@/types/swagger/PatientsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const usePatientsQuery = () => {
  const apiClient = useApiClient();

  const fetchPatient = async () => {
    return await apiClient.get(`/patients`).then(res => res.data);
  };

  return useQuery<Patients.GetPatients.ResponseBody>({
    queryKey: ['patients'],
    queryFn: fetchPatient,
  });
};
