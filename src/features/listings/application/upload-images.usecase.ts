import type { ImageRepository } from '@/src/features/listings/domain/image-repository';

export async function uploadImagesUseCase(
  repository: ImageRepository,
  files: readonly File[],
  productId: number,
  signal?: AbortSignal,
): Promise<readonly string[]> {
  return repository.uploadImages(files, productId, signal);
}
