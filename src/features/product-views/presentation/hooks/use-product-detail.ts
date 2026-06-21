'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductDetailUseCase } from '@/src/features/product-views/application/get-product-detail.usecase';
import {
  ONE_DAY_MS,
  productViewQueryKeys,
} from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useProductDetail(productId: number) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.detail(productId),
    queryFn: () => getProductDetailUseCase(repository, productId),
    staleTime: ONE_DAY_MS,
    gcTime: ONE_DAY_MS,
  });
}
