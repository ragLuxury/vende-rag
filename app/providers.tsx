'use client';

import type { ReactNode } from 'react';
import { AuthRepositoryProvider } from '@/src/features/auth/presentation/auth-repository-provider';
import { authHttpRepository } from '@/src/features/auth/infrastructure/auth-http-repository';
import { QueryProvider } from '@/src/shared/infrastructure/query/query-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthRepositoryProvider repository={authHttpRepository}>{children}</AuthRepositoryProvider>
    </QueryProvider>
  );
}
