import type {
  AccountRepository,
  ClientProfile,
} from '@/src/features/account/domain/account-repository';

export async function getProfileUseCase(
  repository: AccountRepository,
  clientId: number,
  signal?: AbortSignal,
): Promise<ClientProfile> {
  return repository.getProfile(clientId, signal);
}
