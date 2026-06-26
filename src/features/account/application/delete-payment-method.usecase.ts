import type { AccountRepository } from '@/src/features/account/domain/account-repository';

export async function deletePaymentMethodUseCase(
  repository: AccountRepository,
  clientId: number,
  signal?: AbortSignal,
): Promise<void> {
  await repository.deletePaymentMethod(clientId, signal);
}
