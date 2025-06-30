import { useQuery } from '@tanstack/react-query';

import { Schedule } from '@/types/swagger/ScheduleRoute';
import { useApiClient } from '@/utils/hooks/useApiClient';

export const useScheduleQuery = (date?: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append('sector_id', '1');
  if (date) {
    queryParams.append('date', date);
  }
  const apiClient = useApiClient();

  const fetchSchedule = async () => {
    return await apiClient.get<Schedule.GetSchedule.ResponseBody>(
      `/schedule?${queryParams.toString()}`,
    );
  };

  return useQuery({
    queryKey: ['schedule', date],
    queryFn: fetchSchedule,
  });
};
