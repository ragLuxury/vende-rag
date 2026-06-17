'use client';

import type { ReactNode } from 'react';
import { ImageRepositoryContext } from '@/src/features/listings/application/image-repository-context';
import type { ImageRepository } from '@/src/features/listings/domain/image-repository';

interface ImageRepositoryProviderProps {
  repository: ImageRepository;
  children: ReactNode;
}

export function ImageRepositoryProvider({ repository, children }: ImageRepositoryProviderProps) {
  return (
    <ImageRepositoryContext.Provider value={repository}>{children}</ImageRepositoryContext.Provider>
  );
}
