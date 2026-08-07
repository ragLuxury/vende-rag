import type { AccountRepository } from '@/src/features/account/domain/account-repository';

export async function signContractUseCase(
  repository: AccountRepository,
  clientId: number,
  pdfBlob: Blob,
  fileName: string,
  signal?: AbortSignal,
): Promise<void> {
  await repository.uploadAndSignContract(clientId, pdfBlob, fileName, signal);
}
