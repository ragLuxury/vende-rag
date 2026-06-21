import type {
  ProductViewRepository,
  SellerPayment,
} from '@/src/features/product-views/domain/product-view-repository';

export async function getSellerPaymentsUseCase(
  repository: ProductViewRepository,
  productId: number,
  signal?: AbortSignal,
): Promise<readonly SellerPayment[]> {
  return repository.getSellerPayments(productId, signal);
}
