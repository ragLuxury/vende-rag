import { z } from 'zod';

export const privacyResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  ),
});
