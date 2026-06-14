'use client';

import { useMutation } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { deleteAccountUseCase } from '@/src/features/account/application/delete-account.usecase';

export function useDeleteAccount() {
  const repository = useAccountRepository();

  return useMutation({
    mutationFn: (clientId: number) => deleteAccountUseCase(repository, clientId),
  });
}
