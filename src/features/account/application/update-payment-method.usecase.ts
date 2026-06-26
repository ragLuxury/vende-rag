import type {
  AccountRepository,
  PaymentMethodInput,
} from '@/src/features/account/domain/account-repository';

export async function updatePaymentMethodUseCase(
  repository: AccountRepository,
  clientId: number,
  data: PaymentMethodInput,
  signal?: AbortSignal,
): Promise<void> {
  await repository.updatePaymentMethod(clientId, data, signal);
}
