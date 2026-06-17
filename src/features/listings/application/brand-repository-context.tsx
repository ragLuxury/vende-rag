'use client';

import { createContext, useContext } from 'react';
import type { BrandRepository } from '@/src/features/listings/domain/brand-repository';

export const BrandRepositoryContext = createContext<BrandRepository | null>(null);

export function useBrandRepository(): BrandRepository {
  const repository = useContext(BrandRepositoryContext);
  if (!repository) {
    throw new Error('useBrandRepository must be used within a BrandRepositoryProvider');
  }
  return repository;
}
