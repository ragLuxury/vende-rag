'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';
import { signContractUseCase } from '@/src/features/account/application/sign-contract.usecase';

interface SignContractInput {
  clientId: number;
  pdfBlob: Blob;
  fileName: string;
}

export function useSignContract() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, pdfBlob, fileName }: SignContractInput) =>
      signContractUseCase(repository, clientId, pdfBlob, fileName),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
