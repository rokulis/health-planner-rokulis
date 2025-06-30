import { useQuery } from '@tanstack/react-query';

import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useProtocolQuery = (id?: string) => {
  const apiClient = useApiClient();

  const fetchProtocol = async () => {
    return apiClient.get(`/protocols/${id}`).then(res => res.data);
  };

  return useQuery<Protocols.GetProtocol.ResponseBody>({
    queryKey: ['protocols', id],
    queryFn: fetchProtocol,
    enabled: !!id,
  });
};
