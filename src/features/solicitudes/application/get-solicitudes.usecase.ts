import type {
  Solicitud,
  SolicitudRepository,
} from '@/src/features/solicitudes/domain/solicitud-repository';

export async function getSolicitudesUseCase(
  repository: SolicitudRepository,
  clientId: number,
  signal?: AbortSignal,
): Promise<readonly Solicitud[]> {
  return repository.getSolicitudes(clientId, signal);
}
