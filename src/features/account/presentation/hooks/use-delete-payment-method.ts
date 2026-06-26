'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { deletePaymentMethodUseCase } from '@/src/features/account/application/delete-payment-method.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';

interface DeletePaymentMethodInput {
  clientId: number;
}

export function useDeletePaymentMethod() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId }: DeletePaymentMethodInput) =>
      deletePaymentMethodUseCase(repository, clientId),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
