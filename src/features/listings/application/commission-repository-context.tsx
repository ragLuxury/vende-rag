'use client';

import { createContext, useContext } from 'react';
import type { CommissionRepository } from '@/src/features/listings/domain/commission-repository';

export const CommissionRepositoryContext = createContext<CommissionRepository | null>(null);

export function useCommissionRepository(): CommissionRepository {
  const repository = useContext(CommissionRepositoryContext);
  if (!repository) {
    throw new Error('useCommissionRepository must be used within a CommissionRepositoryProvider');
  }
  return repository;
}
