import type {
  ProductPrice,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function getProductPriceUseCase(
  repository: ProductViewRepository,
  productId: number,
  signal?: AbortSignal,
): Promise<ProductPrice> {
  return repository.getProductPrice(productId, signal);
}
