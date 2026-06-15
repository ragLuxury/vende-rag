export const faqQueryKeys = {
  all: ['faq'] as const,
  list: () => [...faqQueryKeys.all, 'list'] as const,
};
