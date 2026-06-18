import type { SolicitudRepository } from '@/src/features/solicitudes/domain/solicitud-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { solicitudesResponseSchema } from './solicitud-schemas';

export const solicitudHttpRepository = {
  async getSolicitudes(clientId, query, signal) {
    const params = new URLSearchParams();
    const q = query.q?.trim();
    if (q) params.set('q', q);

    const search = params.toString();
    const path = `/mobile/products/solicitudes/${clientId}${search ? `?${search}` : ''}`;

    const response = await httpRequest(path, {
      schema: solicitudesResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item) => ({
      id: item.id,
      uuid: item.uuid,
      name: item.modelo ?? '',
      price: item.precio,
      status: item.Estado,
      brand: item.marca,
      image: item.galeria?.[0] ?? '',
    }));
  },
} satisfies SolicitudRepository;
