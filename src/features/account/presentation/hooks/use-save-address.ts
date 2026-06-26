'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { createAddressUseCase } from '@/src/features/account/application/create-address.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';
import { updateAddressUseCase } from '@/src/features/account/application/update-address.usecase';
import type { AddressInput } from '@/src/features/account/domain/account-repository';

interface SaveAddressInput {
  clientId: number;
  addressId: number | null;
  data: AddressInput;
}

export function useSaveAddress() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, addressId, data }: SaveAddressInput) =>
      addressId === null
        ? createAddressUseCase(repository, clientId, data)
        : updateAddressUseCase(repository, addressId, data),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
