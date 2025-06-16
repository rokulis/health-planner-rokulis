'use server';

import { apiClient } from '@/app/actions';
import { Sectors } from '@/types/swagger/SectorsRoute';

export async function getSectors() {
  return apiClient<Sectors.GetSectors.ResponseBody>('/sectors', {
    next: {
      tags: ['sectors'],
      revalidate: 3600, // Revalidate every hour
    },
  });
}
