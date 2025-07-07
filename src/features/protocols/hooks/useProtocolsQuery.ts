import { useQuery } from '@tanstack/react-query';

import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useProtocolsQuery = (search: string = "") => {
  const apiClient = useApiClient();
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('name', search);
  }
  const url = `/protocols?${queryParams.toString()}`;

  const fetchProtocols = async () => {
    return apiClient.get(url).then(res => res.data);
  };

  return useQuery<Protocols.GetProtocols.ResponseBody>({
    queryKey: ['protocols', search],
    queryFn: fetchProtocols,
  });
};
