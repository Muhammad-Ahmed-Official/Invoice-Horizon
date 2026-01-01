import { z } from 'zod';

export const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  status: z.enum(["PAID", "PENDING", "OVERDUE"]),
  total: z.coerce.number().min(1),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.coerce.number().min(1),
      rate: z.coerce.number().min(0),
    })
  ),
});