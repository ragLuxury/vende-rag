'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { loginUseCase } from '@/src/features/auth/application/login.usecase';
import type { LoginCredentials } from '@/src/features/auth/domain/auth-repository';

export function useLogin() {
  const repository = useAuthRepository();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUseCase(repository, credentials),
    onSuccess: () => router.replace('/'),
  });
}
