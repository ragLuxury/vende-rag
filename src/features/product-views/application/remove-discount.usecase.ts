import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';

export async function removeDiscountUseCase(
  repository: ProductViewRepository,
  productId: number,
  signal?: AbortSignal,
): Promise<void> {
  return repository.removeDiscount(productId, signal);
}
