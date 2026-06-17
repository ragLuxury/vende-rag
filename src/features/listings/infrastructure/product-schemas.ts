import { z } from 'zod';

export const createProductsResponseSchema = z.object({
  success: z.boolean(),
  inserted: z.number(),
  skipped: z.number(),
  message: z.string(),
  data: z.object({
    products: z.array(z.unknown()),
    duplicates: z.array(z.unknown()),
  }),
});
