import { z } from 'zod';

export const uploadImagesResponseSchema = z.object({
  success: z.boolean(),
  urls: z.array(z.string()),
});
