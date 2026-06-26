'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { createPaymentMethodUseCase } from '@/src/features/account/application/create-payment-method.usecase';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';
import { updatePaymentMethodUseCase } from '@/src/features/account/application/update-payment-method.usecase';
import type { PaymentMethodInput } from '@/src/features/account/domain/account-repository';

interface SavePaymentMethodInput {
  clientId: number;
  hasExistingPaymentMethod: boolean;
  data: PaymentMethodInput;
}

export function useSavePaymentMethod() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, hasExistingPaymentMethod, data }: SavePaymentMethodInput) =>
      hasExistingPaymentMethod
        ? updatePaymentMethodUseCase(repository, clientId, data)
        : createPaymentMethodUseCase(repository, clientId, data),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
