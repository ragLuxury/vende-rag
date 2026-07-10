'use client';

import { useQuery } from '@tanstack/react-query';
import { sellerQueryKeys } from '@/src/features/listings/application/seller-query-keys';
import { useSellerRepository } from '@/src/features/listings/application/seller-repository-context';
import { getSellersUseCase } from '@/src/features/listings/application/get-sellers.usecase';

export function useSellers(enabled: boolean) {
  const repository = useSellerRepository();

  return useQuery({
    queryKey: sellerQueryKeys.list(),
    queryFn: ({ signal }) => getSellersUseCase(repository, signal),
    enabled,
  });
}
