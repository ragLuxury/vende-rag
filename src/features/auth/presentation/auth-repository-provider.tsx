'use client';

import type { ReactNode } from 'react';
import { AuthRepositoryContext } from '@/src/features/auth/application/auth-repository-context';
import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

interface AuthRepositoryProviderProps {
  repository: AuthRepository;
  children: ReactNode;
}

export function AuthRepositoryProvider({ repository, children }: AuthRepositoryProviderProps) {
  return (
    <AuthRepositoryContext.Provider value={repository}>{children}</AuthRepositoryContext.Provider>
  );
}
