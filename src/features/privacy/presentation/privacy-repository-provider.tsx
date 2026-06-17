'use client';

import type { ReactNode } from 'react';
import { PrivacyRepositoryContext } from '@/src/features/privacy/application/privacy-repository-context';
import type { PrivacyRepository } from '@/src/features/privacy/domain/privacy-repository';

interface PrivacyRepositoryProviderProps {
  repository: PrivacyRepository;
  children: ReactNode;
}

export function PrivacyRepositoryProvider({
  repository,
  children,
}: PrivacyRepositoryProviderProps) {
  return (
    <PrivacyRepositoryContext.Provider value={repository}>
      {children}
    </PrivacyRepositoryContext.Provider>
  );
}
