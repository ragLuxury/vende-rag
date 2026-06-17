import type { TermsDocument, TermsRepository } from '@/src/features/terms/domain/terms-repository';

export async function getTermsUseCase(
  repository: TermsRepository,
  signal?: AbortSignal,
): Promise<readonly TermsDocument[]> {
  return repository.getTerms(signal);
}
