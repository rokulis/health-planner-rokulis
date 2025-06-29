import { z } from 'zod';

export const relativeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  kinship: z.string().min(1, 'Kinship is required'),
  email: z.string().email('Invalid email format'),
  phone_number: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  id: z.coerce.number().optional(),
  patient_id: z.coerce.number().optional(),
});

export const relativesSchema = z.object({
  relatives: z.array(relativeSchema),
});
