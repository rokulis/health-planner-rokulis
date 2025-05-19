'use server';

import { apiClient } from '@/app/actions';
import { Rooms } from '@/types/swagger/RoomsRoute';

export async function getRooms() {
  return apiClient<Rooms.GetAllRooms.ResponseBody>('/rooms');
}
