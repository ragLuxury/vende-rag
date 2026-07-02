import type {
  AccountRepository,
  AddressInput,
  PaymentMethodInput,
} from '@/src/features/account/domain/account-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { getContractUrl } from '@/src/shared/infrastructure/images/contract-document';
import {
  accountMutationResponseSchema,
  banksResponseSchema,
  clientProfileResponseSchema,
  deleteAccountResponseSchema,
  updateProfileResponseSchema,
} from './account-schemas';

function toAddressBody(data: AddressInput) {
  return {
    calle: data.street,
    colonia: data.neighborhood,
    noe: data.exteriorNumber,
    noi: data.interiorNumber,
    ciudad: data.city,
    estado: data.state,
    pais: data.country,
    cp: data.postalCode,
    referencia: data.reference,
  };
}

function toPaymentMethodBody(data: PaymentMethodInput) {
  return {
    banco: data.bank,
    nombre: data.holder,
    cuenta: data.accountNumber,
    clabe: data.clabe,
  };
}

export const accountHttpRepository = {
  async getProfile(clientId, signal) {
    const response = await httpRequest(`/web/client/${clientId}`, {
      schema: clientProfileResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const [profile] = response.data.profile;
    if (!profile) throw new Error('Client profile is missing personal data');

    const [address] = response.data.adress;
    const [paymentMethod] = response.data.paymentMethod;

    return {
      id: response.data.id,
      email: response.data.email,
      firstName: profile.name,
      lastName: profile.lastname,
      phone: response.data.phone,
      contract: response.data.contrato ? getContractUrl(response.data.contrato) : null,
      address: address
        ? {
            id: address.id,
            street: address.calle,
            exteriorNumber: address.noe,
            interiorNumber: address.noi,
            neighborhood: address.colonia,
            city: address.ciudad,
            state: address.estado,
            country: address.pais,
            postalCode: address.cp,
            reference: address.referencia ?? null,
            latitude: address.lat ? Number(address.lat) : null,
            longitude: address.lng ? Number(address.lng) : null,
          }
        : null,
      paymentMethod: paymentMethod
        ? {
            id: paymentMethod.id,
            bank: paymentMethod.banco,
            holder: paymentMethod.nombre,
            accountNumber: paymentMethod.cuenta,
            clabe: paymentMethod.CLABE,
          }
        : null,
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

  async createAddress(clientId, data, signal) {
    await httpRequest(`/web/client/address/${clientId}`, {
      method: 'POST',
      body: toAddressBody(data),
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async updateAddress(clientId, data, signal) {
    await httpRequest(`/web/client/address/${clientId}`, {
      method: 'PATCH',
      body: toAddressBody(data),
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async deleteAddress(clientId, signal) {
    await httpRequest(`/web/client/address/${clientId}`, {
      method: 'DELETE',
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async createPaymentMethod(clientId, data, signal) {
    await httpRequest(`/web/client/payment-method/${clientId}`, {
      method: 'POST',
      body: toPaymentMethodBody(data),
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async updatePaymentMethod(clientId, data, signal) {
    await httpRequest(`/web/client/payment-method/${clientId}`, {
      method: 'PATCH',
      body: toPaymentMethodBody(data),
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async deletePaymentMethod(clientId, signal) {
    await httpRequest(`/web/client/payment-method/${clientId}`, {
      method: 'DELETE',
      schema: accountMutationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },

  async getBanks(signal) {
    const response = await httpRequest('/banks?page=1&limit=50', {
      schema: banksResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data;
  },
} satisfies AccountRepository;
