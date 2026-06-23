import { z } from 'zod';

export const clientProfileResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    email: z.string(),
    phone: z.string(),
    profile: z
      .array(
        z.object({
          name: z.string(),
          lastname: z.string(),
        }),
      )
      .min(1),
  }),
});

export const updateProfileResponseSchema = z.unknown();

export const deleteAccountResponseSchema = z.unknown();
