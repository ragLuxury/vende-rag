'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRepository } from '@/src/features/account/application/account-repository-context';
import { profileQueryKeys } from '@/src/features/account/application/profile-query-keys';
import { updateProfileUseCase } from '@/src/features/account/application/update-profile.usecase';
import type { ProfileUpdate } from '@/src/features/account/domain/account-repository';

interface UpdateProfileInput {
  clientId: number;
  data: ProfileUpdate;
}

export function useUpdateProfile() {
  const repository = useAccountRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, data }: UpdateProfileInput) =>
      updateProfileUseCase(repository, clientId, data),
    onSuccess: (_result, { clientId }) =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(clientId) }),
  });
}
