'use client';

import { useQuery } from '@tanstack/react-query';
import { commissionQueryKeys } from '@/src/features/listings/application/commission-query-keys';
import { useCommissionRepository } from '@/src/features/listings/application/commission-repository-context';
import { getCommissionUseCase } from '@/src/features/listings/application/get-commission.usecase';

export function useCommission(price: number, userId: number | null) {
  const repository = useCommissionRepository();

  return useQuery({
    queryKey: commissionQueryKeys.detail(price, userId ?? 0),
    queryFn: ({ signal }) => {
      if (userId === null) throw new Error('userId is required to fetch a commission');
      return getCommissionUseCase(repository, { price, userId }, signal);
    },
    enabled: price > 0 && userId !== null,
  });
}
