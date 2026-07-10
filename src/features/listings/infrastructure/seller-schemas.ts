import { z } from 'zod';

export const sellersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string().nullish(),
      lastname: z.string().nullish(),
      email: z.string().nullish(),
    }),
  ),
});
