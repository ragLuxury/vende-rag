import type { ProductRepository } from '@/src/features/listings/domain/product-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { createProductsResponseSchema } from './product-schemas';

export const productHttpRepository = {
  async createProducts(products, signal) {
    const body = {
      products: products.map((product) => ({
        brand_id: product.brandId,
        origen: product.origen,
        model: product.model,
        price: product.price,
        detail: product.detail,
        link_producto: product.linkProducto,
        id_cliente: product.clientId,
        others: { galeria: product.gallery.map((image) => ({ img: image.img })) },
      })),
    };

    const response = await httpRequest('/web/products', {
      method: 'POST',
      body,
      schema: createProductsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return {
      inserted: response.inserted,
      skipped: response.skipped,
      message: response.message,
    };
  },
} satisfies ProductRepository;
