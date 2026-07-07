'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { isAuthenticatedUseCase } from '@/src/features/auth/application/is-authenticated.usecase';

export type AuthGuardMode = 'require-auth' | 'require-guest';

const REDIRECT_BY_MODE: Record<AuthGuardMode, string> = {
  'require-auth': '/welcome',
  'require-guest': '/',
};

const subscribeNoop = () => () => {};

function isAllowed(mode: AuthGuardMode, authenticated: boolean): boolean {
  return mode === 'require-auth' ? authenticated : !authenticated;
}

export function useAuthGuard(mode: AuthGuardMode): { checking: boolean } {
  const repository = useAuthRepository();
  const router = useRouter();

  const authenticated = useSyncExternalStore<boolean | null>(
    subscribeNoop,
    () => isAuthenticatedUseCase(repository),
    () => null,
  );

  useEffect(() => {
    if (authenticated === null) return;
    if (!isAllowed(mode, authenticated)) {
      router.replace(REDIRECT_BY_MODE[mode]);
    }
  }, [authenticated, mode, router]);

  return { checking: authenticated === null || !isAllowed(mode, authenticated) };
}
