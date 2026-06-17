'use client';

import { createContext, useContext } from 'react';
import type { ImageRepository } from '@/src/features/listings/domain/image-repository';

export const ImageRepositoryContext = createContext<ImageRepository | null>(null);

export function useImageRepository(): ImageRepository {
  const repository = useContext(ImageRepositoryContext);
  if (!repository) {
    throw new Error('useImageRepository must be used within an ImageRepositoryProvider');
  }
  return repository;
}
