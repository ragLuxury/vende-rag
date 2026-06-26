import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  type: z.string(),
});

export const loginResponseSchema = z.object({
  message: z.string(),
  user: authUserSchema,
  token: z.string(),
});

export const registerResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    clientId: z.number(),
    profileId: z.number(),
  }),
});

export const forgotPasswordResponseSchema = z.unknown();

export const validateResetTokenResponseSchema = z.object({
  token: z.string(),
});

export const resetPasswordResponseSchema = z.unknown();
