'use client';

import { createContext, useContext } from 'react';
import type { DesignerRepository } from '@/src/features/designers/domain/designer-repository';

export const DesignerRepositoryContext = createContext<DesignerRepository | null>(null);

export function useDesignerRepository(): DesignerRepository {
  const repository = useContext(DesignerRepositoryContext);
  if (!repository) {
    throw new Error('useDesignerRepository must be used within a DesignerRepositoryProvider');
  }
  return repository;
}
