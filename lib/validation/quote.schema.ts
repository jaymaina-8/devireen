import { z } from 'zod';

export const quoteItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1),
  unit_price: z.number().min(0),
});

export const quoteSchema = z.object({
  customer_id: z.string().uuid().optional().nullable(),
  session_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  items: z.array(quoteItemSchema).min(1, "Quote must contain at least one item"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
