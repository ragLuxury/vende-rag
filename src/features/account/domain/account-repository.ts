export interface ClientAddress {
  id: number;
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface AddressInput {
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string;
}

export interface PaymentMethodInput {
  bank: string;
  holder: string;
  accountNumber: string;
  clabe: string;
}

export interface Bank {
  id: number;
  name: string;
}

export interface ClientPaymentMethod {
  id: number;
  bank: string;
  holder: string;
  accountNumber: string;
  clabe: string;
}

export interface ClientProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  contract: string | null;
  address: ClientAddress | null;
  paymentMethod: ClientPaymentMethod | null;
}

/**
 * Short, display-only name pair (first word of each of the DB's name/lastname
 * columns). Distinct from {@link ClientProfile}, which carries the full
 * multi-word name used by profile-edit flows.
 */
export interface ClientProfileSummary {
  firstName: string;
  lastName: string;
}

export interface ProfileUpdate {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AccountRepository {
  getProfile(clientId: number, signal?: AbortSignal): Promise<ClientProfile>;
  getProfileSummary(clientId: number, signal?: AbortSignal): Promise<ClientProfileSummary>;
  updateProfile(clientId: number, data: ProfileUpdate, signal?: AbortSignal): Promise<void>;
  deleteAccount(clientId: number): Promise<void>;
  createAddress(clientId: number, data: AddressInput, signal?: AbortSignal): Promise<void>;
  updateAddress(clientId: number, data: AddressInput, signal?: AbortSignal): Promise<void>;
  deleteAddress(clientId: number, signal?: AbortSignal): Promise<void>;
  createPaymentMethod(
    clientId: number,
    data: PaymentMethodInput,
    signal?: AbortSignal,
  ): Promise<void>;
  updatePaymentMethod(
    clientId: number,
    data: PaymentMethodInput,
    signal?: AbortSignal,
  ): Promise<void>;
  deletePaymentMethod(clientId: number, signal?: AbortSignal): Promise<void>;
  getBanks(signal?: AbortSignal): Promise<readonly Bank[]>;
}
