'use client';

import { createContext, useContext } from 'react';
import type { ProductRepository } from '@/src/features/listings/domain/product-repository';

export const ProductRepositoryContext = createContext<ProductRepository | null>(null);

export function useProductRepository(): ProductRepository {
  const repository = useContext(ProductRepositoryContext);
  if (!repository) {
    throw new Error('useProductRepository must be used within a ProductRepositoryProvider');
  }
  return repository;
}
