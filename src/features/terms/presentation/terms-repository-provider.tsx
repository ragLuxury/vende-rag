'use client';

import type { ReactNode } from 'react';
import { TermsRepositoryContext } from '@/src/features/terms/application/terms-repository-context';
import type { TermsRepository } from '@/src/features/terms/domain/terms-repository';

interface TermsRepositoryProviderProps {
  repository: TermsRepository;
  children: ReactNode;
}

export function TermsRepositoryProvider({ repository, children }: TermsRepositoryProviderProps) {
  return (
    <TermsRepositoryContext.Provider value={repository}>{children}</TermsRepositoryContext.Provider>
  );
}
