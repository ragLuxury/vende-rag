'use client';

import { createContext, useContext } from 'react';
import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';

export const ProductViewRepositoryContext = createContext<ProductViewRepository | null>(null);

export function useProductViewRepository(): ProductViewRepository {
  const repository = useContext(ProductViewRepositoryContext);
  if (!repository) {
    throw new Error('useProductViewRepository must be used within a ProductViewRepositoryProvider');
  }
  return repository;
}
