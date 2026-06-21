import type {
  ProductDetail,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function getProductDetailUseCase(
  repository: ProductViewRepository,
  productId: number,
  signal?: AbortSignal,
): Promise<ProductDetail> {
  return repository.getProductDetail(productId, signal);
}
