import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export const useOpenSlotsQuery = ({
  date,
  duration,
}: {
  date?: string;
  duration: number;
}) => {
  const cookies = useCookies();

  const fetchOpenSlots = async () => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule/open-slots?date=${date}&sector_id=1&duration=${duration}`,
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
        throw new Error('Failed to fetch open slots');
      }
      return res.json();
    });
  };

  return useQuery({
    queryKey: ['schedule', 'openSlots', date],
    queryFn: fetchOpenSlots,
    enabled: !!date,
  });
};
