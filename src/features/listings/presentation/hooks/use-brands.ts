'use client';

import { useQuery } from '@tanstack/react-query';
import { brandQueryKeys } from '@/src/features/listings/application/brand-query-keys';
import { useBrandRepository } from '@/src/features/listings/application/brand-repository-context';
import { getBrandsUseCase } from '@/src/features/listings/application/get-brands.usecase';

export function useBrands() {
  const repository = useBrandRepository();

  return useQuery({
    queryKey: brandQueryKeys.list(),
    queryFn: ({ signal }) => getBrandsUseCase(repository, signal),
  });
}
