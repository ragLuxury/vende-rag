'use client';

import { useQuery } from '@tanstack/react-query';
import { termsQueryKeys } from '@/src/features/terms/application/terms-query-keys';
import { useTermsRepository } from '@/src/features/terms/application/terms-repository-context';
import { getTermsUseCase } from '@/src/features/terms/application/get-terms.usecase';

export function useTerms() {
  const repository = useTermsRepository();

  return useQuery({
    queryKey: termsQueryKeys.list(),
    queryFn: ({ signal }) => getTermsUseCase(repository, signal),
  });
}
