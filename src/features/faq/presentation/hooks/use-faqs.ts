'use client';

import { useQuery } from '@tanstack/react-query';
import { faqQueryKeys } from '@/src/features/faq/application/faq-query-keys';
import { useFaqRepository } from '@/src/features/faq/application/faq-repository-context';
import { getFaqsUseCase } from '@/src/features/faq/application/get-faqs.usecase';

export function useFaqs() {
  const repository = useFaqRepository();

  return useQuery({
    queryKey: faqQueryKeys.list(),
    queryFn: ({ signal }) => getFaqsUseCase(repository, signal),
  });
}
