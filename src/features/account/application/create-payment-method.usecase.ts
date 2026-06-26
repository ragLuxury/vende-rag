import type {
  AccountRepository,
  PaymentMethodInput,
} from '@/src/features/account/domain/account-repository';

export async function createPaymentMethodUseCase(
  repository: AccountRepository,
  clientId: number,
  data: PaymentMethodInput,
  signal?: AbortSignal,
): Promise<void> {
  await repository.createPaymentMethod(clientId, data, signal);
}
