import { z } from 'zod';

export const productsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      uuid: z.string(),
      marca: z.string(),
      modelo: z.string().nullish(),
      nombre: z.string().nullish(),
      original_price: z.number(),
      precio: z.number(),
      Estado: z.string(),
      status_intern: z.string().nullish(),
      galeria: z.array(z.string()).nullish(),
    }),
  ),
});

export const productDetailResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    client_id: z.number(),
    uuid: z.string(),
    name_product: z.string().nullish(),
    modelo: z.string().nullish(),
    marca: z.string().nullish(),
    departamento: z.string().nullish(),
    categoria: z.string().nullish(),
    subcategoria: z.string().nullish(),
    color: z.string().nullish(),
    detalle: z.string().nullish(),
    estatus: z.string().nullish(),
    Estado: z.string().nullish(),
    state: z.coerce.number().nullish(),
    Fecha: z.string().nullish(),
    original_price: z.number(),
    precio: z.number(),
    rag: z.coerce.number().nullish(),
    galeria: z.array(z.string()).nullish(),
  }),
});

export const negotiationResponseSchema = z.object({
  success: z.boolean(),
});

export const commissionResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    price: z.number(),
    user_id: z.number(),
    commission: z.object({
      type: z.string(),
      rate: z.number(),
      seller_net: z.number(),
    }),
  }),
});

export const sellerPaymentsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      amount: z.coerce.number(),
      payment_date: z.string(),
      payment_method: z.string(),
      receipt_path: z.string().nullish(),
    }),
  ),
});
