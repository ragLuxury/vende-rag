import { z } from 'zod';

export const brandsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
