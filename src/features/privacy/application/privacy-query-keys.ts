export const privacyQueryKeys = {
  all: ['privacy'] as const,
  list: () => [...privacyQueryKeys.all, 'list'] as const,
};
