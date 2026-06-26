import type { AccountRepository, Bank } from '@/src/features/account/domain/account-repository';

export async function getBanksUseCase(
  repository: AccountRepository,
  signal?: AbortSignal,
): Promise<readonly Bank[]> {
  return repository.getBanks(signal);
}
