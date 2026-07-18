import type { CSSProperties } from 'react';
import {
  findProductStatusByLabel,
  normalizeStatusText,
} from '@/src/features/product-views/domain/product-status';

const DEFAULT_COLOR = '#F3F4F6';

/**
 * Colors for status text with no corresponding numeric product code (e.g.
 * `status_intern` values, alternate gender forms, legacy free-form text).
 * The 13 coded statuses live in the single source of truth at
 * `domain/product-status.ts` — do not duplicate them here.
 */
const SUPPLEMENTARY_STATUS_COLORS: Record<string, string> = {
  rechazada: '#EB6A6A',
  aprobada: '#DBE3F3',
  activa: '#81BD53',
  'bolería p/c': '#966C90',
  bolería: '#B693B1',
  inactiva: '#E6E7E7',
  inactivar: '#E6E7E7',
  completado: '#E3EFD9',
  ingresado: '#99C9C9',
  autentificado: '#9594B6',
  heredit: '#B7B4DB',
  apartado: '#F0C8E0',
  donado: '#D89E49',
  'apartado perdido': '#F2B186',
  'venta cancelada': '#D3DAE2',
  cancelada: '#D3DAE2',
  venta: '#CCA0C2',
  pendiente: '#CD7352',
  liquidado: '#BDD57C',
  'pago parcial': '#FAF2A1',
  utilizado: '#FAF2A1',
  disponible: '#BDD57C',
};

function darken(hex: string, factor: number): string {
  const channel = (start: number) => {
    const value = Math.round(parseInt(hex.slice(start, start + 2), 16) * factor);
    return value.toString(16).padStart(2, '0');
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
}

export function getStatusStyle(status: string): CSSProperties {
  const background =
    findProductStatusByLabel(status)?.color ??
    SUPPLEMENTARY_STATUS_COLORS[normalizeStatusText(status)] ??
    DEFAULT_COLOR;
  return { backgroundColor: background, color: darken(background, 0.45) };
}
