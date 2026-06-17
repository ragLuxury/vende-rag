'use client';

import type { ReactNode } from 'react';
import { BrandRepositoryContext } from '@/src/features/listings/application/brand-repository-context';
import type { BrandRepository } from '@/src/features/listings/domain/brand-repository';

interface BrandRepositoryProviderProps {
  repository: BrandRepository;
  children: ReactNode;
}

export function BrandRepositoryProvider({ repository, children }: BrandRepositoryProviderProps) {
  return (
    <BrandRepositoryContext.Provider value={repository}>{children}</BrandRepositoryContext.Provider>
  );
}
