import { useQuery } from '@tanstack/react-query';

import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useProtocolsQuery = () => {
  const apiClient = useApiClient();

  const fetchProtocols = async () => {
    return apiClient.get<Protocols.GetProtocols.ResponseBody>('/protocols');
  };

  return useQuery({
    queryKey: ['protocols'],
    queryFn: fetchProtocols,
  });
};
