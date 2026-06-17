import type { Brand, BrandRepository } from '@/src/features/listings/domain/brand-repository';

export async function getBrandsUseCase(
  repository: BrandRepository,
  signal?: AbortSignal,
): Promise<readonly Brand[]> {
  return repository.getBrands(signal);
}
