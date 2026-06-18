export const solicitudQueryKeys = {
  all: ['solicitudes'] as const,
  list: (clientId: number, q: string) =>
    [...solicitudQueryKeys.all, 'list', { clientId, q }] as const,
};
