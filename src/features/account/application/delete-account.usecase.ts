import type { AccountRepository } from '@/src/features/account/domain/account-repository';

export async function deleteAccountUseCase(
  repository: AccountRepository,
  clientId: number,
): Promise<void> {
  await repository.deleteAccount(clientId);
}
