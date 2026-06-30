'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { loginWithGoogleUseCase } from '@/src/features/auth/application/login-with-google.usecase';
import type { GoogleLoginData } from '@/src/features/auth/domain/auth-repository';

export function useGoogleLogin() {
  const repository = useAuthRepository();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: GoogleLoginData) => loginWithGoogleUseCase(repository, data),
    onSuccess: () => router.replace('/'),
  });
}
