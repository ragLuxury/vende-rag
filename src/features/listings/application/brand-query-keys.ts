export const brandQueryKeys = {
  all: ['brands'] as const,
  list: () => [...brandQueryKeys.all, 'list'] as const,
};
