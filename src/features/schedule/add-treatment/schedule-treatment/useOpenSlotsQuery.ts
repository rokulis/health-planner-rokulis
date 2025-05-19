import { useQuery } from '@tanstack/react-query';

export const useOpenSlotsQuery = (date: string) => {
  const fetchOpenSlots = async () => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule/open-slots?date=${date}&sector_id=1&duration=3600`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer 2|kk6rA0SJmOIoML4zU7mdtEItDZvPXfw46q52xcmS5180cf7b`,
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
