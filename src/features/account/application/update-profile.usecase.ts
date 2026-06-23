import type {
  AccountRepository,
  ProfileUpdate,
} from '@/src/features/account/domain/account-repository';

export async function updateProfileUseCase(
  repository: AccountRepository,
  clientId: number,
  data: ProfileUpdate,
  signal?: AbortSignal,
): Promise<void> {
  await repository.updateProfile(clientId, data, signal);
}
