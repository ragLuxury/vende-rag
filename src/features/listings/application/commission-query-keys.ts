export const commissionQueryKeys = {
  all: ['commission'] as const,
  detail: (price: number, userId: number) =>
    [...commissionQueryKeys.all, 'detail', { price, userId }] as const,
};
