'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductsUseCase } from '@/src/features/product-views/application/get-products.usecase';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';
import type { ProductView } from '@/src/features/product-views/domain/product-view-repository';

export function useProducts(view: ProductView, clientId: number | null, q: string) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.list(view, clientId ?? 0, q),
    queryFn: ({ signal }) =>
      getProductsUseCase(repository, view, clientId as number, { q }, signal),
    enabled: clientId !== null,
  });
}
