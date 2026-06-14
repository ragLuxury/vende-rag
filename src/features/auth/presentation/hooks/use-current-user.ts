'use client';

import { useSyncExternalStore } from 'react';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { getCurrentUserUseCase } from '@/src/features/auth/application/get-current-user.usecase';
import type { AuthUser } from '@/src/features/auth/domain/auth-repository';

const subscribeNoop = () => () => {};

export function useCurrentUser(): AuthUser | null {
  const repository = useAuthRepository();

  return useSyncExternalStore(
    subscribeNoop,
    () => getCurrentUserUseCase(repository),
    () => null,
  );
}
