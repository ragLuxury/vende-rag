import type { ImageRepository } from '@/src/features/listings/domain/image-repository';

export async function uploadImagesUseCase(
  repository: ImageRepository,
  files: readonly File[],
  signal?: AbortSignal,
): Promise<readonly string[]> {
  return repository.uploadImages(files, signal);
}
