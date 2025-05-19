'use server';

import { apiClient } from '@/app/actions';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

export const getProtocols = async () => {
  return await apiClient<Protocols.GetProtocols.ResponseBody>('/protocols', {
    next: {
      revalidate: 3600,
      tags: ['protocols'],
    }
  });
};
