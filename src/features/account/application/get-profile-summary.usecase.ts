import type {
  AccountRepository,
  ClientProfileSummary,
} from '@/src/features/account/domain/account-repository';

export async function getProfileSummaryUseCase(
  repository: AccountRepository,
  clientId: number,
  signal?: AbortSignal,
): Promise<ClientProfileSummary> {
  return repository.getProfileSummary(clientId, signal);
}
