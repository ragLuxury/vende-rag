import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';

export async function getProductIdByUuidUseCase(
  repository: ProductViewRepository,
  uuid: string,
  signal?: AbortSignal,
): Promise<number> {
  return repository.getProductIdByUuid(uuid, signal);
}
