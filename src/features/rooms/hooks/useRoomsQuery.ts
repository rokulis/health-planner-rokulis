import { useQuery } from '@tanstack/react-query';

import { Rooms } from '@/types/swagger/RoomsRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useRoomsQuery = () => {
  const apiClient = useApiClient();

  const fetchRooms = async () => {
    return await apiClient.get(`/rooms`).then(res => res.data);
  };

  return useQuery<Rooms.GetAllRooms.ResponseBody>({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  });
};
