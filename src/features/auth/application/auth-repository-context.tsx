'use client';

import { createContext, useContext } from 'react';
import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export const AuthRepositoryContext = createContext<AuthRepository | null>(null);

export function useAuthRepository(): AuthRepository {
  const repository = useContext(AuthRepositoryContext);
  if (!repository) {
    throw new Error('useAuthRepository must be used within an AuthRepositoryProvider');
  }
  return repository;
}
