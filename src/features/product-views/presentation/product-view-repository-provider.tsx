'use client';

import type { ReactNode } from 'react';
import { ProductViewRepositoryContext } from '@/src/features/product-views/application/product-view-repository-context';
import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';

interface ProductViewRepositoryProviderProps {
  repository: ProductViewRepository;
  children: ReactNode;
}

export function ProductViewRepositoryProvider({
  repository,
  children,
}: ProductViewRepositoryProviderProps) {
  return (
    <ProductViewRepositoryContext.Provider value={repository}>
      {children}
    </ProductViewRepositoryContext.Provider>
  );
}
