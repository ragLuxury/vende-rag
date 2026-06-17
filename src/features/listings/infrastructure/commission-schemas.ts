import { z } from 'zod';

export const commissionResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    price: z.number(),
    user_id: z.number(),
    commission: z.object({
      type: z.string(),
      rate: z.number(),
      seller_net: z.number(),
    }),
  }),
});
