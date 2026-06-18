export interface Solicitud {
  id: number;
  uuid: string;
  name: string;
  price: number;
  status: string;
  brand: string;
  image: string;
}

export interface SolicitudQuery {
  q?: string;
}

export interface SolicitudRepository {
  getSolicitudes(
    clientId: number,
    query: SolicitudQuery,
    signal?: AbortSignal,
  ): Promise<readonly Solicitud[]>;
}
