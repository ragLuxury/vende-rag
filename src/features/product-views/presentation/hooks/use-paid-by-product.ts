'use client';

import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getSellerPaymentsUseCase } from '@/src/features/product-views/application/get-seller-payments.usecase';
import {
  ONE_DAY_MS,
  productViewQueryKeys,
} from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function usePaidByProduct(
  productIds: readonly number[],
  enabled: boolean,
): ReadonlyMap<number, number> {
  const repository = useProductViewRepository();

  const results = useQueries({
    queries: productIds.map((productId) => ({
      queryKey: productViewQueryKeys.sellerPayments(productId),
      queryFn: () => getSellerPaymentsUseCase(repository, productId),
      enabled,
      staleTime: ONE_DAY_MS,
      gcTime: ONE_DAY_MS,
    })),
  });

  return useMemo(() => {
    const paidById = new Map<number, number>();
    productIds.forEach((productId, index) => {
      const payments = results[index]?.data;
      if (!payments) return;
      paidById.set(
        productId,
        payments.reduce((total, payment) => total + payment.amount, 0),
      );
    });
    return paidById;
  }, [productIds, results]);
}
