'use client';

import type { ReactNode } from 'react';
import { CommissionRepositoryContext } from '@/src/features/listings/application/commission-repository-context';
import type { CommissionRepository } from '@/src/features/listings/domain/commission-repository';

interface CommissionRepositoryProviderProps {
  repository: CommissionRepository;
  children: ReactNode;
}

export function CommissionRepositoryProvider({
  repository,
  children,
}: CommissionRepositoryProviderProps) {
  return (
    <CommissionRepositoryContext.Provider value={repository}>
      {children}
    </CommissionRepositoryContext.Provider>
  );
}
