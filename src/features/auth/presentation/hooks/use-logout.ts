'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { logoutUseCase } from '@/src/features/auth/application/logout.usecase';

export function useLogout(): () => void {
  const repository = useAuthRepository();
  const router = useRouter();

  return useCallback(() => {
    logoutUseCase(repository);
    router.replace('/welcome');
  }, [repository, router]);
}
