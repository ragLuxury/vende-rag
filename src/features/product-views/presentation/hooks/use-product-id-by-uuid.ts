'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductIdByUuidUseCase } from '@/src/features/product-views/application/get-product-id-by-uuid.usecase';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useProductIdByUuid(uuid: string) {
  const repository = useProductViewRepository();

  return useQuery({
    queryKey: productViewQueryKeys.byUuid(uuid),
    queryFn: () => getProductIdByUuidUseCase(repository, uuid),
    enabled: uuid.length > 0,
    retry: false,
  });
}
