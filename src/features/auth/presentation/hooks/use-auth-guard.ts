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

export function useAuthGuard(mode: AuthGuardMode): { checking: boolean } {
  const repository = useAuthRepository();
  const router = useRouter();

  const authenticated = useSyncExternalStore(
    subscribeNoop,
    () => isAuthenticatedUseCase(repository),
    () => false,
  );

  const allowed = mode === 'require-auth' ? authenticated : !authenticated;

  useEffect(() => {
    if (!allowed) {
      router.replace(REDIRECT_BY_MODE[mode]);
    }
  }, [allowed, mode, router]);

  return { checking: !allowed };
}
