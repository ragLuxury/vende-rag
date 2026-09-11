export interface ImageRepository {
  uploadStagingImages(files: readonly File[], signal?: AbortSignal): Promise<readonly string[]>;
}
