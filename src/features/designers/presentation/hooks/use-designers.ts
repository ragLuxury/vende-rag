'use client';

import { useQuery } from '@tanstack/react-query';
import { designerQueryKeys } from '@/src/features/designers/application/designer-query-keys';
import { useDesignerRepository } from '@/src/features/designers/application/designer-repository-context';
import { getDesignersUseCase } from '@/src/features/designers/application/get-designers.usecase';

export function useDesigners() {
  const repository = useDesignerRepository();

  return useQuery({
    queryKey: designerQueryKeys.list(),
    queryFn: ({ signal }) => getDesignersUseCase(repository, signal),
  });
}
