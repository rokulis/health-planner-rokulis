import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  personal_code: z.string().min(1, 'Personal code is required'),
  date_of_birth: z.string().min(1, 'Date is required'),
  email: z.string().email('Invalid email format'),
  phone_number: z.string().min(1, 'Phone number is required'),
  weight: z.coerce.number().min(0, 'Weight must be a positive number'),
  height: z.coerce.number().min(0, 'Height must be a positive number'),
  address: z.string().min(1, 'Address is required'),
});
