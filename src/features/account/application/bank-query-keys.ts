export const bankQueryKeys = {
  all: ['banks'] as const,
  list: () => [...bankQueryKeys.all, 'list'] as const,
};
