import type { AccountRepository } from '@/src/features/account/domain/account-repository';

export async function deleteAddressUseCase(
  repository: AccountRepository,
  clientId: number,
  signal?: AbortSignal,
): Promise<void> {
  await repository.deleteAddress(clientId, signal);
}
