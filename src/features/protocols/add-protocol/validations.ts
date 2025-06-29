import { z } from 'zod';

import { MedicineProcedureEnum } from '@/types/swagger/data-contracts';

const flexibleDaysSchema = z
  .string()
  .regex(/^[1-9]\d*(\s*,\s*[1-9]\d*)*$/, 'Must be numbers separated by commas')
  .transform(value => value.replace(/\s/g, ''));

export const medicineSchema = z.object({
  atc_code: z.string().min(1, 'ATC code is required'),
  procedure: z.nativeEnum(MedicineProcedureEnum),
  default_time: z.string().optional(),
});

export const protocolMedicineSchema = z.object({
  medicine_id: z.coerce.number().min(1, 'Medicine ID is required'),
  dose: z.coerce.string().min(1, 'Dosage must be at least 1'),
  comments: z.string().optional().nullish(),
  protocol_medicine_group_id: z.coerce.number().int().nonnegative(),
  medicine: medicineSchema,
});

export const medicineGroupSchema = z.object({
  protocol_id: z.number().int().nonnegative(),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 day'),
  treatment_days: flexibleDaysSchema,
  medicines: z
    .array(protocolMedicineSchema)
    .min(1, 'At least one medicine is required'),
});

export const protocolSchema = z.object({
  clinic_id: z.coerce.number().int().nonnegative(),
  name: z.string().min(1, 'Protocol name is required'),
  diagnosis_id: z.coerce.number(),
  cycle_duration: z.coerce.number(),
  medicine_groups: z
    .array(medicineGroupSchema)
    .min(1, 'At least one medicine group is required'),
});
