'use server';

import { apiClient } from '@/app/actions';
import { Rooms } from '@/types/swagger/RoomsRoute';

export async function getRooms() {
  return apiClient<Rooms.GetAllRooms.ResponseBody>('/rooms?sector_id=1', {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['rooms'],
    },
  });
}
