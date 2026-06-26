import type {
  AccountRepository,
  AddressInput,
} from '@/src/features/account/domain/account-repository';

export async function updateAddressUseCase(
  repository: AccountRepository,
  clientId: number,
  data: AddressInput,
  signal?: AbortSignal,
): Promise<void> {
  await repository.updateAddress(clientId, data, signal);
}
