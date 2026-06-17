import type { SolicitudRepository } from '@/src/features/solicitudes/domain/solicitud-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { solicitudesResponseSchema } from './solicitud-schemas';

export const solicitudHttpRepository = {
  async getSolicitudes(clientId, signal) {
    const response = await httpRequest(`/mobile/products/solicitudes/${clientId}`, {
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
