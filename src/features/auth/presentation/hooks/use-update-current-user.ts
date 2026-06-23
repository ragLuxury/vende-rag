'use client';

import { useCallback } from 'react';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { updateCurrentUserUseCase } from '@/src/features/auth/application/update-current-user.usecase';
import type { AuthUser } from '@/src/features/auth/domain/auth-repository';

export function useUpdateCurrentUser() {
  const repository = useAuthRepository();

  return useCallback(
    (patch: Partial<AuthUser>) => updateCurrentUserUseCase(repository, patch),
    [repository],
  );
}
