import type {
  NegotiationDecision,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function respondNegotiationUseCase(
  repository: ProductViewRepository,
  productId: number,
  decision: NegotiationDecision,
  signal?: AbortSignal,
): Promise<void> {
  return repository.respondNegotiation(productId, decision, signal);
}
