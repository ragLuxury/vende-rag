import {
  findProductStatusByCode,
  normalizeStatusText,
} from '@/src/features/product-views/domain/product-status';
import type {
  Product,
  ProductView,
} from '@/src/features/product-views/domain/product-view-repository';
import { AppError } from '@/src/shared/domain/errors';

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

function statusEquals(...values: readonly string[]) {
  return (product: Product) => {
    const status = product.status.trim().toLowerCase();
    return values.some((value) => status === value);
  };
}

/** Label for a known numeric product status code, from the single source of truth. */
function statusLabel(code: number): string {
  const status = findProductStatusByCode(code);
  if (!status) {
    throw new AppError(`Unknown product status code: ${code}`);
  }
  return status.label;
}

export const VIEW_CONFIG: Record<ProductView, ViewConfig> = {
  solicitudes: {
    title: 'Solicitudes',
    searchPlaceholder: 'Busca tus solicitudes',
    emptyText: 'No se encontraron solicitudes',
    cardSecondary: SALE_PRICE_SECONDARY,
    summary: [
      {
        label: statusLabel(3),
        icon: 'ion:checkmark-circle-outline',
        format: 'count',
        matches: statusIncludes(normalizeStatusText(statusLabel(3))),
      },
      {
        label: statusLabel(2),
        icon: 'ion:sync-outline',
        format: 'count',
        matches: statusIncludes(normalizeStatusText(statusLabel(2))),
      },
      {
        label: statusLabel(1),
        icon: 'ion:refresh-outline',
        format: 'count',
        // Partial needle: intentionally also matches truncated/prefixed variants of "En Revisión".
        matches: statusIncludes('revisión'),
      },
      {
        label: statusLabel(4),
        icon: 'ion:close-circle-outline',
        format: 'count',
        matches: statusIncludes('rechazad'),
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
        label: statusLabel(11),
        icon: 'ion:pricetag-outline',
        format: 'count',
        matches: statusEquals(normalizeStatusText(statusLabel(11))),
      },
      {
        label: 'Recibidas',
        icon: 'ion:cube-outline',
        format: 'count',
        // Partial needle: intentionally also matches gender/plural variants of "Recibido".
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
        label: statusLabel(13),
        icon: 'ion:arrow-undo-outline',
        format: 'count',
        // 'devolución' is an extra fuzzy needle with no dedicated status code.
        matches: statusIncludes(normalizeStatusText(statusLabel(13)), 'devolución'),
      },
      {
        label: statusLabel(14),
        icon: 'ion:checkmark-circle-outline',
        format: 'count',
        matches: statusIncludes(normalizeStatusText(statusLabel(14))),
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
        label: statusLabel(20),
        icon: 'ion:lock-closed-outline',
        format: 'currency',
        matches: statusIncludes(normalizeStatusText(statusLabel(20))),
        amount: 'pending',
      },
      {
        label: statusLabel(21),
        icon: 'ion:cash-outline',
        format: 'currency',
        matches: statusIncludes(normalizeStatusText(statusLabel(21))),
        amount: 'paid',
      },
    ],
  },
};
