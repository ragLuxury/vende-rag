'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { forgotPasswordUseCase } from '@/src/features/auth/application/forgot-password.usecase';

export function useForgotPassword() {
  const repository = useAuthRepository();

  return useMutation({
    mutationFn: (email: string) => forgotPasswordUseCase(repository, email),
  });
}
