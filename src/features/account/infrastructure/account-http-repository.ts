import type { AccountRepository } from '@/src/features/account/domain/account-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import {
  clientProfileResponseSchema,
  deleteAccountResponseSchema,
  updateProfileResponseSchema,
} from './account-schemas';

export const accountHttpRepository = {
  async getProfile(clientId, signal) {
    const response = await httpRequest(`/web/client/${clientId}`, {
      schema: clientProfileResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const [profile] = response.data.profile;
    if (!profile) throw new Error('Client profile is missing personal data');

    return {
      id: response.data.id,
      email: response.data.email,
      firstName: profile.name,
      lastName: profile.lastname,
      phone: response.data.phone,
    };
  },

  async updateProfile(clientId, data, signal) {
    await httpRequest(`/web/client/profile/${clientId}`, {
      method: 'PATCH',
      body: {
        nombres: data.firstName,
        apellidos: data.lastName,
        telefono: data.phone,
        email: data.email,
      },
      schema: updateProfileResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async deleteAccount(clientId) {
    await httpRequest(`/web/client/${clientId}`, {
      method: 'DELETE',
      schema: deleteAccountResponseSchema,
    });
  },
} satisfies AccountRepository;
