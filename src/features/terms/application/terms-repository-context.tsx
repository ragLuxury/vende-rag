'use client';

import { createContext, useContext } from 'react';
import type { TermsRepository } from '@/src/features/terms/domain/terms-repository';

export const TermsRepositoryContext = createContext<TermsRepository | null>(null);

export function useTermsRepository(): TermsRepository {
  const repository = useContext(TermsRepositoryContext);
  if (!repository) {
    throw new Error('useTermsRepository must be used within a TermsRepositoryProvider');
  }
  return repository;
}
