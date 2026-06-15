import type { FaqItem, FaqRepository } from '@/src/features/faq/domain/faq-repository';

export async function getFaqsUseCase(
  repository: FaqRepository,
  signal?: AbortSignal,
): Promise<readonly FaqItem[]> {
  return repository.getFaqs(signal);
}
