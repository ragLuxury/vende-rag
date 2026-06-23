export interface ClientProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ProfileUpdate {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AccountRepository {
  getProfile(clientId: number, signal?: AbortSignal): Promise<ClientProfile>;
  updateProfile(clientId: number, data: ProfileUpdate, signal?: AbortSignal): Promise<void>;
  deleteAccount(clientId: number): Promise<void>;
}
