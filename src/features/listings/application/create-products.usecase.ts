import type {
  CreateProductsResult,
  NewProduct,
  ProductRepository,
} from '@/src/features/listings/domain/product-repository';

export async function createProductsUseCase(
  repository: ProductRepository,
  products: readonly NewProduct[],
  signal?: AbortSignal,
): Promise<CreateProductsResult> {
  return repository.createProducts(products, signal);
}
