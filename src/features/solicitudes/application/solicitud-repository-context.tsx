'use client';

import { createContext, useContext } from 'react';
import type { SolicitudRepository } from '@/src/features/solicitudes/domain/solicitud-repository';

export const SolicitudRepositoryContext = createContext<SolicitudRepository | null>(null);

export function useSolicitudRepository(): SolicitudRepository {
  const repository = useContext(SolicitudRepositoryContext);
  if (!repository) {
    throw new Error('useSolicitudRepository must be used within a SolicitudRepositoryProvider');
  }
  return repository;
}
