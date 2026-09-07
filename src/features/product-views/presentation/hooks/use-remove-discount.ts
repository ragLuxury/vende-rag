'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeDiscountUseCase } from '@/src/features/product-views/application/remove-discount.usecase';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';

export function useRemoveDiscount() {
  const repository = useProductViewRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => removeDiscountUseCase(repository, productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productViewQueryKeys.all }),
  });
}
