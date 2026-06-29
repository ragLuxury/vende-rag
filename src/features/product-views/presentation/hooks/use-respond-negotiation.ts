'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productViewQueryKeys } from '@/src/features/product-views/application/product-view-query-keys';
import { useProductViewRepository } from '@/src/features/product-views/application/product-view-repository-context';
import { respondNegotiationUseCase } from '@/src/features/product-views/application/respond-negotiation.usecase';
import type { NegotiationDecision } from '@/src/features/product-views/domain/product-view-repository';

interface RespondNegotiationInput {
  productId: number;
  decision: NegotiationDecision;
}

export function useRespondNegotiation() {
  const repository = useProductViewRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, decision }: RespondNegotiationInput) =>
      respondNegotiationUseCase(repository, productId, decision),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productViewQueryKeys.all }),
  });
}
