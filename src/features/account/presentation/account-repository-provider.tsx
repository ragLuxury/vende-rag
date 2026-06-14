'use client';

import type { ReactNode } from 'react';
import { AccountRepositoryContext } from '@/src/features/account/application/account-repository-context';
import type { AccountRepository } from '@/src/features/account/domain/account-repository';

interface AccountRepositoryProviderProps {
  repository: AccountRepository;
  children: ReactNode;
}

export function AccountRepositoryProvider({
  repository,
  children,
}: AccountRepositoryProviderProps) {
  return (
    <AccountRepositoryContext.Provider value={repository}>
      {children}
    </AccountRepositoryContext.Provider>
  );
}
