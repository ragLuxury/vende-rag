export interface ImageRepository {
  uploadImages(files: readonly File[], productId: number, signal?: AbortSignal): Promise<readonly string[]>;
}
