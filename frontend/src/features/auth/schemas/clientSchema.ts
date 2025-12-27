import z from "zod";

export const clientSchema = z.object({
    name: z
        .string()
        .min(2, "name is required"),
    company: z
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
})