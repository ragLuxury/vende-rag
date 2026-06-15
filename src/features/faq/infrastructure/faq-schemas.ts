import { z } from 'zod';

export const faqResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});
