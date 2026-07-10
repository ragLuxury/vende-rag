import type { Seller, SellerRepository } from '@/src/features/listings/domain/seller-repository';

export async function getSellersUseCase(
  repository: SellerRepository,
  signal?: AbortSignal,
): Promise<readonly Seller[]> {
  return repository.getSellers(signal);
}
