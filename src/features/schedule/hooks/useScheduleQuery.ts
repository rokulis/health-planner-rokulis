import { useQuery } from '@tanstack/react-query';

import { Schedule } from '@/types/swagger/ScheduleRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useScheduleQuery = (date?: string, sectorId?: number) => {
  const queryParams = new URLSearchParams();
  if (date) {
    queryParams.append('date', date);
  }
  if (sectorId) {
    queryParams.append('sector_id', sectorId.toString());
  }
  const apiClient = useApiClient();

  const fetchSchedule = async () => {
    return await apiClient.get<Schedule.GetSchedule.ResponseBody>(
      `/schedule?${queryParams.toString()}`,
    );
  };

  return useQuery({
    queryKey: ['schedule', queryParams.toString()],
    queryFn: fetchSchedule,
  });
};
