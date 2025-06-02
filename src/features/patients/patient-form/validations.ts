import { z } from 'zod';

const dateSchema = z
  .string()
  .min(1, 'Date is required')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(date => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Please enter a valid date')
  .refine(date => {
    const parsedDate = new Date(date);
    const currentDate = new Date();
    const minDate = new Date('1900-01-01');
    return parsedDate >= minDate && parsedDate <= currentDate;
  }, 'Date must be between 1900-01-01 and today');

export const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  personal_code: z.string().min(1, 'Personal code is required'),
  date_of_birth: dateSchema,
  email: z.string().email('Invalid email format'),
  phone_number: z.string().min(1, 'Phone number is required'),
  weight: z.coerce.number().min(0, 'Weight must be a positive number'),
  height: z.coerce.number().min(0, 'Height must be a positive number'),
  address: z.string().min(1, 'Address is required'),
});
