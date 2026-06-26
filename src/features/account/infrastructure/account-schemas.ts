import { z } from 'zod';

const addressSchema = z.object({
  id: z.number(),
  calle: z.string(),
  colonia: z.string(),
  noe: z.string(),
  noi: z.string(),
  ciudad: z.string(),
  estado: z.string(),
  pais: z.string(),
  cp: z.string(),
  referencia: z.string(),
  lat: z.string().nullish(),
  lng: z.string().nullish(),
});

const paymentMethodSchema = z.object({
  id: z.number(),
  banco: z.string(),
  nombre: z.string(),
  cuenta: z.string(),
  CLABE: z.string(),
});

export const clientProfileResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    email: z.string(),
    phone: z.string(),
    contrato: z.string().nullable(),
    adress: z.array(addressSchema),
    paymentMethod: z.array(paymentMethodSchema),
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

export const accountMutationResponseSchema = z.unknown();

export const banksResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
