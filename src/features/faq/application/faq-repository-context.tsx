'use client';

import { createContext, useContext } from 'react';
import type { FaqRepository } from '@/src/features/faq/domain/faq-repository';

export const FaqRepositoryContext = createContext<FaqRepository | null>(null);

export function useFaqRepository(): FaqRepository {
  const repository = useContext(FaqRepositoryContext);
  if (!repository) {
    throw new Error('useFaqRepository must be used within a FaqRepositoryProvider');
  }
  return repository;
}
