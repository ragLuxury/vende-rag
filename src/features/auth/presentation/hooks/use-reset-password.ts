'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { resetPasswordUseCase } from '@/src/features/auth/application/reset-password.usecase';

interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export function useResetPassword() {
  const repository = useAuthRepository();

  return useMutation({
    mutationFn: ({ token, newPassword }: ResetPasswordInput) =>
      resetPasswordUseCase(repository, token, newPassword),
  });
}
