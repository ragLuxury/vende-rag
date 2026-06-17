'use client';

import type { ReactNode } from 'react';
import { ProductRepositoryContext } from '@/src/features/listings/application/product-repository-context';
import type { ProductRepository } from '@/src/features/listings/domain/product-repository';

interface ProductRepositoryProviderProps {
  repository: ProductRepository;
  children: ReactNode;
}

export function ProductRepositoryProvider({
  repository,
  children,
}: ProductRepositoryProviderProps) {
  return (
    <ProductRepositoryContext.Provider value={repository}>
      {children}
    </ProductRepositoryContext.Provider>
  );
}
