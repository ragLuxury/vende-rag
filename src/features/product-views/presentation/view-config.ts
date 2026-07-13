import type {
  Product,
  ProductView,
} from '@/src/features/product-views/domain/product-view-repository';

export type CurrencyAmount = 'salePrice' | 'earning' | 'pending' | 'paid';

export interface SummaryConfig {
  label: string;
  icon: string;
  format: 'count' | 'currency';
  matches: (product: Product) => boolean;
  amount?: CurrencyAmount;
}

export interface CardSecondaryConfig {
  label: string;
  amount: CurrencyAmount;
}

export interface ViewConfig {
  title: string;
  searchPlaceholder: string;
  emptyText: string;
  backHref?: string;
  cardSecondary: CardSecondaryConfig;
  summary: readonly SummaryConfig[];
}

const SALE_PRICE_SECONDARY: CardSecondaryConfig = { label: 'Precio de Venta', amount: 'salePrice' };

function statusIncludes(...needles: readonly string[]) {
  return (product: Product) => {
    const status = product.status.trim().toLowerCase();
    return needles.some((needle) => status.includes(needle));
  };
}

export const VIEW_CONFIG: Record<ProductView, ViewConfig> = {
  solicitudes: {
    title: 'Solicitudes',
    searchPlaceholder: 'Busca tus solicitudes',
    emptyText: 'No se encontraron solicitudes',
    cardSecondary: SALE_PRICE_SECONDARY,
    summary: [
      {
        label: 'Preaprobada',
        icon: 'ion:checkmark-circle-outline',
        format: 'count',
        matches: statusIncludes('preaprobada'),
      },
      {
        label: 'Negociación',
        icon: 'ion:sync-outline',
        format: 'count',
        matches: statusIncludes('negociación'),
      },
      {
        label: 'En Revisión',
        icon: 'ion:refresh-outline',
        format: 'count',
        matches: statusIncludes('revisión'),
      },
    ],
  },
  publicaciones: {
    title: 'Publicaciones',
    searchPlaceholder: 'Busca tus publicaciones',
    emptyText: 'No se encontraron publicaciones',
    cardSecondary: SALE_PRICE_SECONDARY,
    summary: [
      {
        label: 'Publicadas',
        icon: 'ion:pricetag-outline',
        format: 'count',
        matches: statusIncludes('activa'),
      },
      {
        label: 'Recibidas',
        icon: 'ion:cube-outline',
        format: 'count',
        matches: statusIncludes('recibid'),
      },
    ],
  },
  devoluciones: {
    title: 'Devoluciones',
    searchPlaceholder: 'Busca tus devoluciones',
    emptyText: 'No se encontraron devoluciones',
    cardSecondary: SALE_PRICE_SECONDARY,
    summary: [
      {
        label: 'Por Devolver',
        icon: 'ion:arrow-undo-outline',
        format: 'count',
        matches: statusIncludes('por devolver', 'devolución'),
      },
      {
        label: 'Devuelto',
        icon: 'ion:checkmark-circle-outline',
        format: 'count',
        matches: statusIncludes('devuelto'),
      },
    ],
  },
  ventas: {
    title: 'Ventas',
    searchPlaceholder: 'Busca tus ventas',
    emptyText: 'No se encontraron ventas',
    backHref: '/',
    cardSecondary: { label: 'Por pagar', amount: 'pending' },
    summary: [
      {
        label: 'Por Pagar',
        icon: 'ion:lock-closed-outline',
        format: 'currency',
        matches: statusIncludes('por pagar'),
        amount: 'pending',
      },
      {
        label: 'Pagado',
        icon: 'ion:cash-outline',
        format: 'currency',
        matches: statusIncludes('pagado'),
        amount: 'paid',
      },
    ],
  },
};
