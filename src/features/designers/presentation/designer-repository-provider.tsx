'use client';

import type { ReactNode } from 'react';
import { DesignerRepositoryContext } from '@/src/features/designers/application/designer-repository-context';
import type { DesignerRepository } from '@/src/features/designers/domain/designer-repository';

interface DesignerRepositoryProviderProps {
  repository: DesignerRepository;
  children: ReactNode;
}

export function DesignerRepositoryProvider({
  repository,
  children,
}: DesignerRepositoryProviderProps) {
  return (
    <DesignerRepositoryContext.Provider value={repository}>
      {children}
    </DesignerRepositoryContext.Provider>
  );
}
