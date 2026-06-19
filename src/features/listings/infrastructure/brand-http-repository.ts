import type { BrandRepository } from '@/src/features/listings/domain/brand-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { brandsResponseSchema } from './brand-schemas';

export const brandHttpRepository = {
  async getBrands(signal) {
    const response = await httpRequest('/web/brands', {
      schema: brandsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item) => ({ id: item.id, name: item.name }));
  },
} satisfies BrandRepository;
