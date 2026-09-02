'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { hasCompleteSessionUseCase } from '@/src/features/auth/application/has-complete-session.usecase';
import { isAuthenticatedUseCase } from '@/src/features/auth/application/is-authenticated.usecase';
import { logoutUseCase } from '@/src/features/auth/application/logout.usecase';

export type AuthGuardMode = 'require-auth' | 'require-guest';

const REDIRECT_BY_MODE: Record<AuthGuardMode, string> = {
  'require-auth': '/welcome',
  'require-guest': '/',
};

const subscribeNoop = () => () => {};

function isAllowed(mode: AuthGuardMode, session: boolean): boolean {
  return mode === 'require-auth' ? session : !session;
}

export function useAuthGuard(mode: AuthGuardMode): { checking: boolean } {
  const repository = useAuthRepository();
  const router = useRouter();

  /**
   * `require-auth` demands a complete session, not just a token: letting a
   * half-stored session through is what made private screens render "no tienes
   * productos" instead of asking the seller to sign in again.
   */
  const session = useSyncExternalStore<boolean | null>(
    subscribeNoop,
    () =>
      mode === 'require-auth'
        ? hasCompleteSessionUseCase(repository)
        : isAuthenticatedUseCase(repository),
    () => null,
  );

  useEffect(() => {
    if (session === null || isAllowed(mode, session)) return;

    // Clear the leftovers so the next sign-in starts from a clean slate; a
    // stale token would otherwise keep failing every request with a 401.
    if (mode === 'require-auth') logoutUseCase(repository);
    router.replace(REDIRECT_BY_MODE[mode]);
  }, [mode, repository, router, session]);

  return { checking: session === null || !isAllowed(mode, session) };
}
