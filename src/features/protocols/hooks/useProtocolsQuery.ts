import { useQuery } from '@tanstack/react-query';

import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useProtocolsQuery = () => {
  const apiClient = useApiClient();

  const fetchProtocols = async () => {
    return apiClient.get('/protocols').then(res => res.data);
  };

  return useQuery<Protocols.GetProtocols.ResponseBody>({
    queryKey: ['protocols'],
    queryFn: fetchProtocols,
  });
};
