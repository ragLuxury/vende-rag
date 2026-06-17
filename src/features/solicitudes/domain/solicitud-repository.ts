export interface Solicitud {
  id: number;
  uuid: string;
  name: string;
  price: number;
  status: string;
  brand: string;
  image: string;
}

export interface SolicitudRepository {
  getSolicitudes(clientId: number, signal?: AbortSignal): Promise<readonly Solicitud[]>;
}
