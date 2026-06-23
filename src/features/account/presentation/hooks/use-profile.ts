'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { getProfileUseCase } from '@/src/features/account/application/get-profile.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';

export function useProfile(clientId: number | null) {
  const repository = useAccountRepository();

  return useQuery({
    queryKey: profileQueryKeys.detail(clientId ?? 0),
    queryFn: ({ signal }) => {
      if (clientId === null) throw new Error('clientId is required to fetch a profile');
      return getProfileUseCase(repository, clientId, signal);
    },
    enabled: clientId !== null,
  });
}
