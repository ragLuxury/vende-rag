import type { ImageRepository } from '@/src/features/listings/domain/image-repository';
import { HttpError, ValidationError } from '@/src/shared/domain/errors';
import { uploadImagesResponseSchema } from './image-schemas';

export const imageHttpRepository = {
  async uploadImages(files, signal) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      ...(signal ? { signal } : {}),
    });

    const json: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      throw new HttpError(response.status, 'No se pudieron subir las imágenes', json);
    }

    const parsed = uploadImagesResponseSchema.safeParse(json);
    if (!parsed.success) {
      throw new ValidationError('Upload response failed schema validation', parsed.error);
    }

    return parsed.data.urls;
  },
} satisfies ImageRepository;
