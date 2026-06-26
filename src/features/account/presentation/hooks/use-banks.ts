'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { bankQueryKeys } from '@/src/features/account/application/bank-query-keys';
import { getBanksUseCase } from '@/src/features/account/application/get-banks.usecase';

export function useBanks() {
  const repository = useAccountRepository();

  return useQuery({
    queryKey: bankQueryKeys.list(),
    queryFn: ({ signal }) => getBanksUseCase(repository, signal),
    staleTime: Infinity,
  });
}
