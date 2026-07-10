'use client';

import { createContext, useContext } from 'react';
import type { SellerRepository } from '@/src/features/listings/domain/seller-repository';

export const SellerRepositoryContext = createContext<SellerRepository | null>(null);

export function useSellerRepository(): SellerRepository {
  const repository = useContext(SellerRepositoryContext);
  if (!repository) {
    throw new Error('useSellerRepository must be used within a SellerRepositoryProvider');
  }
  return repository;
}
