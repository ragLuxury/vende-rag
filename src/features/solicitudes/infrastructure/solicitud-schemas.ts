import { z } from 'zod';

export const solicitudesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      uuid: z.string(),
      marca: z.string(),
      modelo: z.string().nullish(),
      precio: z.number(),
      Estado: z.string(),
      galeria: z.array(z.string()).nullish(),
    }),
  ),
});
