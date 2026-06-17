'use client';

import { useQuery } from '@tanstack/react-query';
import { privacyQueryKeys } from '@/src/features/privacy/application/privacy-query-keys';
import { usePrivacyRepository } from '@/src/features/privacy/application/privacy-repository-context';
import { getPrivacyUseCase } from '@/src/features/privacy/application/get-privacy.usecase';

export function usePrivacy() {
  const repository = usePrivacyRepository();

  return useQuery({
    queryKey: privacyQueryKeys.list(),
    queryFn: ({ signal }) => getPrivacyUseCase(repository, signal),
  });
}
