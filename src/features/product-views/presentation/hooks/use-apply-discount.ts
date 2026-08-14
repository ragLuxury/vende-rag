'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyDiscountUseCase } from '@/src/features/product-views/application/apply-discount.usecase';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';
import type { DiscountType } from '@/src/features/product-views/domain/product-view-repository';

interface ApplyDiscountInput {
  productId: number;
  type: DiscountType;
  value: number;
}

export function useApplyDiscount() {
  const repository = useProductViewRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, type, value }: ApplyDiscountInput) =>
      applyDiscountUseCase(repository, productId, type, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productViewQueryKeys.all }),
  });
}
