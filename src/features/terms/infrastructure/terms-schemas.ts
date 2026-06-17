import { z } from 'zod';

export const termsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      title: z.string(),
      terminos: z.string(),
      condiciones: z.string(),
    }),
  ),
});
