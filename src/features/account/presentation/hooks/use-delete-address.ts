'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { deleteAddressUseCase } from '@/src/features/account/application/delete-address.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';

interface DeleteAddressInput {
  clientId: number;
}

export function useDeleteAddress() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId }: DeleteAddressInput) => deleteAddressUseCase(repository, clientId),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
