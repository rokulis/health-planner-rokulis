'use server';

import { apiClient, getToken } from '@/app/actions';
import { Me } from '@/types/swagger/MeRoute';

export const getMe = async () => {
  const token = await getToken();

  return apiClient<Me.GetProfile.ResponseBody>('/me', {
    next: {
      tags: [`me-${token}`],
      revalidate: 3600,
    },
  });
};
