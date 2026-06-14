'use client';

import { createContext, useContext } from 'react';
import type { AccountRepository } from '@/src/features/account/domain/account-repository';

export const AccountRepositoryContext = createContext<AccountRepository | null>(null);

export function useAccountRepository(): AccountRepository {
  const repository = useContext(AccountRepositoryContext);
  if (!repository) {
    throw new Error('useAccountRepository must be used within an AccountRepositoryProvider');
  }
  return repository;
}
