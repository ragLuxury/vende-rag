export const profileQueryKeys = {
  all: ['profile'] as const,
  detail: (clientId: number) => [...profileQueryKeys.all, 'detail', { clientId }] as const,
  summary: (clientId: number) => [...profileQueryKeys.all, 'summary', { clientId }] as const,
};
