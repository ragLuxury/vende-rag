import type { ImageRepository } from '@/src/features/listings/domain/image-repository';
import { HttpError, ValidationError } from '@/src/shared/domain/errors';
import { tokenStorage } from '@/src/shared/infrastructure/http/token-storage';
import { uploadImagesResponseSchema } from './image-schemas';

export const imageHttpRepository = {
  async uploadImages(files, productId, signal) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    formData.append('productId', String(productId));

    const token = tokenStorage.get();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers,
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
