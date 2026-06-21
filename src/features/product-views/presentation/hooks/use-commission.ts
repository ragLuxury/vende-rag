'use client';

import { useQuery } from '@tanstack/react-query';
import { getCommissionUseCase } from '@/src/features/product-views/application/get-commission.usecase';
import {
  ONE_DAY_MS,
  productViewQueryKeys,
} from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useCommission(price: number, clientId: number, enabled: boolean) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.commission(price, clientId),
    queryFn: () => getCommissionUseCase(repository, price, clientId),
    enabled,
    staleTime: ONE_DAY_MS,
    gcTime: ONE_DAY_MS,
  });
}
