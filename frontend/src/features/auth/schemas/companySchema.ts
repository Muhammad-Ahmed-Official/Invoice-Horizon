import { z } from 'zod';

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name is required')
    .max(100, 'Company name is too long'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),

  address: z
    .string()
    .min(5, 'Address is required')
    .max(255, 'Address is too long'),

  taxRate: z.coerce
    .number()
    .min(0, 'Tax rate cannot be negative')
    .max(100, 'Tax rate cannot exceed 100'),

  paymentTerms: z
    .string()
    .regex(
      /^Net\s(7|15|30|45|60)$/,
      'Payment terms must be like Net 7, Net 15, Net 30, Net 45, or Net 60'
    ),
});
