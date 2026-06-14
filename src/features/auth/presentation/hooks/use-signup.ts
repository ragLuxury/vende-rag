'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { signupUseCase } from '@/src/features/auth/application/signup.usecase';
import type { RegistrationData } from '@/src/features/auth/domain/auth-repository';

export function useSignup() {
  const repository = useAuthRepository();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegistrationData) => signupUseCase(repository, data),
    onSuccess: () => router.push('/login'),
  });
}
