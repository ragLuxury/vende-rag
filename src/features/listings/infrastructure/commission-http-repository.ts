import type { CommissionRepository } from '@/src/features/listings/domain/commission-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { commissionResponseSchema } from './commission-schemas';

export const commissionHttpRepository = {
  async getCommission({ price, userId }, signal) {
    const params = new URLSearchParams({ price: String(price), user_id: String(userId) });
    const response = await httpRequest(`/mobile/products/comission?${params.toString()}`, {
      schema: commissionResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const { commission } = response.data;
    return { type: commission.type, rate: commission.rate, sellerNet: commission.seller_net };
  },
} satisfies CommissionRepository;
