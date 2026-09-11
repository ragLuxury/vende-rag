import type { ImageRepository } from '@/src/features/listings/domain/image-repository';

export async function uploadStagingImagesUseCase(
  repository: ImageRepository,
  files: readonly File[],
  signal?: AbortSignal,
): Promise<readonly string[]> {
  return repository.uploadStagingImages(files, signal);
}
