'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductPriceUseCase } from '@/src/features/product-views/application/get-product-price.usecase';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useProductPrice(productId: number, enabled: boolean) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.price(productId),
    queryFn: ({ signal }) => getProductPriceUseCase(repository, productId, signal),
    enabled,
  });
}
