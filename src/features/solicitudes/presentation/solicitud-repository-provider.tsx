'use client';

import type { ReactNode } from 'react';
import { SolicitudRepositoryContext } from '@/src/features/solicitudes/application/solicitud-repository-context';
import type { SolicitudRepository } from '@/src/features/solicitudes/domain/solicitud-repository';

interface SolicitudRepositoryProviderProps {
  repository: SolicitudRepository;
  children: ReactNode;
}

export function SolicitudRepositoryProvider({
  repository,
  children,
}: SolicitudRepositoryProviderProps) {
  return (
    <SolicitudRepositoryContext.Provider value={repository}>
      {children}
    </SolicitudRepositoryContext.Provider>
  );
}
