import type {
  ProductCommission,
  ProductViewRepository,
} from '@/src/features/product-views/domain/product-view-repository';

export async function getCommissionUseCase(
  repository: ProductViewRepository,
  price: number,
  clientId: number,
  signal?: AbortSignal,
): Promise<ProductCommission> {
  return repository.getCommission(price, clientId, signal);
}
