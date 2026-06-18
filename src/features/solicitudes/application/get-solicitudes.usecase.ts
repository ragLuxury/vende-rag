import type {
  Solicitud,
  SolicitudQuery,
  SolicitudRepository,
} from '@/src/features/solicitudes/domain/solicitud-repository';

export async function getSolicitudesUseCase(
  repository: SolicitudRepository,
  clientId: number,
  query: SolicitudQuery,
  signal?: AbortSignal,
): Promise<readonly Solicitud[]> {
  return repository.getSolicitudes(clientId, query, signal);
}
