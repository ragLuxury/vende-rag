import { z } from 'zod';

const createdProductRefSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  request_id: z.string().optional(),
});

export const createProductsResponseSchema = z.object({
  success: z.boolean(),
  inserted: z.number(),
  skipped: z.number(),
  message: z.string(),
  data: z.object({
    products: z.array(createdProductRefSchema),
    duplicates: z.array(z.unknown()),
  }),
});
