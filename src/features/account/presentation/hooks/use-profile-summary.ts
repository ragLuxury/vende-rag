'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { getProfileSummaryUseCase } from '@/src/features/account/application/get-profile-summary.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';

export function useProfileSummary(clientId: number | null) {
  const repository = useAccountRepository();

  return useQuery({
    queryKey: profileQueryKeys.summary(clientId ?? 0),
    queryFn: ({ signal }) => {
      if (clientId === null) throw new Error('clientId is required to fetch a profile summary');
      return getProfileSummaryUseCase(repository, clientId, signal);
    },
    enabled: clientId !== null,
  });
}
