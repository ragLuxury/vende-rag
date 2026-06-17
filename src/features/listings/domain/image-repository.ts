export interface ImageRepository {
  uploadImages(files: readonly File[], signal?: AbortSignal): Promise<readonly string[]>;
}
