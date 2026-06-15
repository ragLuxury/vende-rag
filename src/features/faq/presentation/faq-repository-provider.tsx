'use client';

import type { ReactNode } from 'react';
import { FaqRepositoryContext } from '@/src/features/faq/application/faq-repository-context';
import type { FaqRepository } from '@/src/features/faq/domain/faq-repository';

interface FaqRepositoryProviderProps {
  repository: FaqRepository;
  children: ReactNode;
}

export function FaqRepositoryProvider({ repository, children }: FaqRepositoryProviderProps) {
  return (
    <FaqRepositoryContext.Provider value={repository}>{children}</FaqRepositoryContext.Provider>
  );
}
