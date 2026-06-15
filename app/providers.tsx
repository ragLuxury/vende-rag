'use client';

import type { ReactNode } from 'react';
import { AccountRepositoryProvider } from '@/src/features/account/presentation/account-repository-provider';
import { accountHttpRepository } from '@/src/features/account/infrastructure/account-http-repository';
import { AuthRepositoryProvider } from '@/src/features/auth/presentation/auth-repository-provider';
import { authHttpRepository } from '@/src/features/auth/infrastructure/auth-http-repository';
import { FaqRepositoryProvider } from '@/src/features/faq/presentation/faq-repository-provider';
import { faqHttpRepository } from '@/src/features/faq/infrastructure/faq-http-repository';
import { QueryProvider } from '@/src/shared/infrastructure/query/query-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthRepositoryProvider repository={authHttpRepository}>
        <AccountRepositoryProvider repository={accountHttpRepository}>
          <FaqRepositoryProvider repository={faqHttpRepository}>{children}</FaqRepositoryProvider>
        </AccountRepositoryProvider>
      </AuthRepositoryProvider>
    </QueryProvider>
  );
}
