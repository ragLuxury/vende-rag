export const solicitudQueryKeys = {
  all: ['solicitudes'] as const,
  list: (clientId: number) => [...solicitudQueryKeys.all, 'list', { clientId }] as const,
};
