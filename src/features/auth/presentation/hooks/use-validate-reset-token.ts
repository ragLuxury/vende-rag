'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { validateResetTokenUseCase } from '@/src/features/auth/application/validate-reset-token.usecase';

export function useValidateResetToken(token: string | null) {
  const repository = useAuthRepository();

  return useQuery({
    queryKey: ['reset-token', token],
    queryFn: () => {
      if (!token) throw new Error('A reset token is required');
      return validateResetTokenUseCase(repository, token);
    },
    enabled: token !== null && token !== '',
    retry: false,
    staleTime: Infinity,
  });
}
