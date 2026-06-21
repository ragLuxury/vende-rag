import type {
  Product,
  ProductView,
  ProductViewQuery,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function getProductsUseCase(
  repository: ProductViewRepository,
  view: ProductView,
  clientId: number,
  query: ProductViewQuery,
  signal?: AbortSignal,
): Promise<readonly Product[]> {
  return repository.getProducts(view, clientId, query, signal);
}
