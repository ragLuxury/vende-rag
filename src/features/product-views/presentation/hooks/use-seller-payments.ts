'use client';

import { useQuery } from '@tanstack/react-query';
import { getSellerPaymentsUseCase } from '@/src/features/product-views/application/get-seller-payments.usecase';
import {
  ONE_DAY_MS,
  productViewQueryKeys,
} from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useSellerPayments(productId: number, enabled: boolean) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.sellerPayments(productId),
    queryFn: () => getSellerPaymentsUseCase(repository, productId),
    enabled,
    staleTime: ONE_DAY_MS,
    gcTime: ONE_DAY_MS,
  });
}
