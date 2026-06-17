'use client';

import { useQuery } from '@tanstack/react-query';
import { solicitudQueryKeys } from '@/src/features/solicitudes/application/solicitud-query-keys';
import { useSolicitudRepository } from '@/src/features/solicitudes/application/solicitud-repository-context';
import { getSolicitudesUseCase } from '@/src/features/solicitudes/application/get-solicitudes.usecase';

export function useSolicitudes(clientId: number | null) {
  const repository = useSolicitudRepository();

  return useQuery({
    queryKey: solicitudQueryKeys.list(clientId ?? 0),
    queryFn: ({ signal }) => getSolicitudesUseCase(repository, clientId as number, signal),
    enabled: clientId !== null,
  });
}
