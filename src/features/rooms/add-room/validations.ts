import { z } from 'zod';

import {
  RoomWorkingDaysEnum,
  StoreRoomRequestCategoryEnum,
} from '@/types/swagger/data-contracts';

const bedSchema = z.object({
  name: z.string().min(1, 'Bed name is required'),
  category: z.nativeEnum(StoreRoomRequestCategoryEnum),
});

export const roomSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  sector_id: z.coerce.number().min(1, 'Sector ID must be at least 1'),
  work_start_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  work_end_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  working_days: z.array(z.nativeEnum(RoomWorkingDaysEnum)),
  beds: z.array(bedSchema).min(1, 'At least one bed is required'),
});
