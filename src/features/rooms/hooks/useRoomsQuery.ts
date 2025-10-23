import { useQuery } from '@tanstack/react-query';

import { Rooms } from '@/types/swagger/RoomsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useRoomsQuery = (sectorId?: number) => {
  const apiClient = useApiClient();
  const queryParams = new URLSearchParams();
  if (sectorId) {
    queryParams.append('sector_id', sectorId.toString());
  }
  const url = `/rooms?${queryParams.toString()}`;

  const fetchRooms = async () => {
    return await apiClient.get(url).then(res => res.data);
  };

  return useQuery<Rooms.GetAllRooms.ResponseBody>({
    queryKey: ['rooms', queryParams.toString()],
    queryFn: fetchRooms,
  });
};
