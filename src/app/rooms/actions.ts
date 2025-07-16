'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Rooms } from '@/types/swagger/RoomsRoute';

export async function getRooms() {
  return apiClient<Rooms.GetAllRooms.ResponseBody>('/rooms', {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['rooms'],
    },
  });
}

export async function getRoom(id: number) {
  return apiClient<Rooms.GetRoom.ResponseBody>(`/rooms/${id}`, {
    next: {
      tags: [`room-${id}`],
      revalidate: 3600, // Revalidate every hour
    },
  });
}

export async function createRoom(data: Rooms.CreateRoom.RequestBody) {
  const res = await apiClient<
    Rooms.CreateRoom.ResponseBody,
    Rooms.CreateRoom.RequestBody
  >('/rooms', {
    method: 'POST',
    body: data,
  });

  revalidateTag('rooms');

  return res;
}

export async function updateRoom(
  id: number,
  data: Rooms.UpdateRoom.RequestBody
) {
  const res = await apiClient<
    Rooms.UpdateRoom.ResponseBody,
    Rooms.UpdateRoom.RequestBody
  >(`/rooms/${id}`, {
    method: 'PUT',
    body: data,
  });

  revalidateTag(`room-${id}`);
  revalidateTag('rooms');

  return res;
}

export async function deleteRoom(id: number) {
  const res = await apiClient(`/rooms/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('rooms');

  return res;
}
