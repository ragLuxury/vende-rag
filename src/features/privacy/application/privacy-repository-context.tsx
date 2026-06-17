'use client';

import { createContext, useContext } from 'react';
import type { PrivacyRepository } from '@/src/features/privacy/domain/privacy-repository';

export const PrivacyRepositoryContext = createContext<PrivacyRepository | null>(null);

export function usePrivacyRepository(): PrivacyRepository {
  const repository = useContext(PrivacyRepositoryContext);
  if (!repository) {
    throw new Error('usePrivacyRepository must be used within a PrivacyRepositoryProvider');
  }
  return repository;
}
