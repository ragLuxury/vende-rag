export const sellerQueryKeys = {
  all: ['sellers'] as const,
  list: () => [...sellerQueryKeys.all, 'list'] as const,
};
