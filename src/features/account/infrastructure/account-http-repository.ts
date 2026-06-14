import type { AccountRepository } from '@/src/features/account/domain/account-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { deleteAccountResponseSchema } from './account-schemas';

export const accountHttpRepository = {
  async deleteAccount(clientId: number) {
    await httpRequest(`/mobile/client/${clientId}`, {
      method: 'DELETE',
      schema: deleteAccountResponseSchema,
    });
  },
} satisfies AccountRepository;
