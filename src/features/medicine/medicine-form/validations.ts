import { z } from 'zod';

import { CreateMedicineProcedureEnum } from '@/types/swagger/data-contracts';

export const medicineSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  atc_code: z.string().min(1, 'ATC code is required'),
  procedure: z.nativeEnum(CreateMedicineProcedureEnum),
  default_time: z.string().min(1, 'Default time is required'),
});
