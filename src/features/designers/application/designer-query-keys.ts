export const designerQueryKeys = {
  all: ['designers'] as const,
  list: () => [...designerQueryKeys.all, 'list'] as const,
};
