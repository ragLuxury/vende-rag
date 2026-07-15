import type { ProductView } from '@/src/features/product-views/domain/product-view-repository';

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const productViewQueryKeys = {
  all: ['product-views'] as const,
  list: (view: ProductView, clientId: number, q: string) =>
    [...productViewQueryKeys.all, view, 'list', { clientId, q }] as const,
  sellerPayments: (productId: number) =>
    [...productViewQueryKeys.all, 'seller-payments', productId] as const,
  detail: (productId: number) => [...productViewQueryKeys.all, 'detail', productId] as const,
  byUuid: (uuid: string) => [...productViewQueryKeys.all, 'by-uuid', uuid] as const,
  commission: (price: number, clientId: number) =>
    [...productViewQueryKeys.all, 'commission', { price, clientId }] as const,
};
