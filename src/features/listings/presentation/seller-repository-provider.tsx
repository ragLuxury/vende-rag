'use client';

import type { ReactNode } from 'react';
import { SellerRepositoryContext } from '@/src/features/listings/application/seller-repository-context';
import type { SellerRepository } from '@/src/features/listings/domain/seller-repository';

interface SellerRepositoryProviderProps {
  repository: SellerRepository;
  children: ReactNode;
}

export function SellerRepositoryProvider({ repository, children }: SellerRepositoryProviderProps) {
  return (
    <SellerRepositoryContext.Provider value={repository}>
      {children}
    </SellerRepositoryContext.Provider>
  );
}
