import type {
  ApplyDiscountResult,
  DiscountType,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function applyDiscountUseCase(
  repository: ProductViewRepository,
  productId: number,
  type: DiscountType,
  value: number,
  signal?: AbortSignal,
): Promise<ApplyDiscountResult> {
  return repository.applyDiscount(productId, type, value, signal);
}
