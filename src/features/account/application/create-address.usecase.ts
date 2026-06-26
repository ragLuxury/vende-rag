import type {
  AccountRepository,
  AddressInput,
} from '@/src/features/account/domain/account-repository';

export async function createAddressUseCase(
  repository: AccountRepository,
  clientId: number,
  data: AddressInput,
  signal?: AbortSignal,
): Promise<void> {
  await repository.createAddress(clientId, data, signal);
}
