import type { SellerRepository } from '@/src/features/listings/domain/seller-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { sellersResponseSchema } from './seller-schemas';

export const sellerHttpRepository = {
  async getSellers(signal) {
    const response = await httpRequest('/web/sellers', {
      schema: sellersResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data
      .map((item) => ({
        id: item.id,
        name: item.name ?? '',
        lastname: item.lastname ?? '',
        email: item.email ?? '',
      }))
      .filter((seller) => seller.name || seller.lastname || seller.email);
  },
} satisfies SellerRepository;
