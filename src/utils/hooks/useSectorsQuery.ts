import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

import { Sectors } from '@/types/swagger/SectorsRoute';

export const useSectorsQuery = (search?: string) => {
  const cookies = useCookies();
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('search', search);
  }

  const fetchSectors = async () => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sectors?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.get('accessToken') || ''}`,
        },
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch sectors');
      }
      return res.json();
    });
  };

  return useQuery<Sectors.GetSectors.ResponseBody>({
    queryKey: ['sectors', search],
    queryFn: fetchSectors,
  });
};
