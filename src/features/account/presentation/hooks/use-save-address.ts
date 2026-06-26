'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { createAddressUseCase } from '@/src/features/account/application/create-address.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';
import { updateAddressUseCase } from '@/src/features/account/application/update-address.usecase';
import type { AddressInput } from '@/src/features/account/domain/account-repository';

interface SaveAddressInput {
  clientId: number;
  hasExistingAddress: boolean;
  data: AddressInput;
}

export function useSaveAddress() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, hasExistingAddress, data }: SaveAddressInput) =>
      hasExistingAddress
        ? updateAddressUseCase(repository, clientId, data)
        : createAddressUseCase(repository, clientId, data),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
