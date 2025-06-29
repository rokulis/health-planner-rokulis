import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

import { Diagnoses } from '@/types/swagger/DiagnosesRoute';

export const useDiagnosesQuery = (search: string) => {
  const cookies = useCookies();
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('search', search);
  }

  const fetchOpenSlots = async () => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/diagnoses?${queryParams.toString()}`,
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
        throw new Error('Failed to fetch diagnoses');
      }
      return res.json();
    });
  };

  return useQuery<Diagnoses.GetDiagnoses.ResponseBody>({
    queryKey: ['diagnoses', search],
    queryFn: fetchOpenSlots,
  });
};
