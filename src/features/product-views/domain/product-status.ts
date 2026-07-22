export interface ProductStatusDefinition {
  readonly code: number;
  readonly label: string;
  readonly color: string;
}

/**
 * Single source of truth for every known numeric product status code. Mirrors
 * the backend's `IF(A.status = N, '...', ...)` chains (api_rga
 * `src/config/products/details.config.js` and the per-view mobile configs).
 * Consumers must derive labels/colors from here instead of re-hardcoding
 * them, to avoid the three-way drift this module replaces.
 */
export const PRODUCT_STATUSES: readonly ProductStatusDefinition[] = [
  { code: 1, label: 'En Revisión', color: '#F2BC59' },
  { code: 2, label: 'Negociación', color: '#F3A25A' },
  { code: 3, label: 'Preaprobada', color: '#DBE3F3' },
  { code: 4, label: 'Rechazado', color: '#EB6A6A' },
  { code: 10, label: 'Recibido', color: '#B5C7E7' },
  { code: 11, label: 'Activo', color: '#81BD53' },
  { code: 12, label: 'Inactivo', color: '#E6E7E7' },
  { code: 13, label: 'Por Devolver', color: '#FCCC81' },
  { code: 14, label: 'Devuelto', color: '#F5B64E' },
  { code: 20, label: 'Por Pagar', color: '#FAF2A1' },
  { code: 21, label: 'Pagado', color: '#BDD57C' },
  { code: 22, label: 'Perdido', color: '#F2B186' },
  { code: 23, label: 'Cancelado', color: '#D3DAE2' },
];

export function normalizeStatusText(status: string): string {
  return status.trim().toLowerCase();
}

export function findProductStatusByCode(code: number): ProductStatusDefinition | undefined {
  return PRODUCT_STATUSES.find((status) => status.code === code);
}

export function findProductStatusByLabel(label: string): ProductStatusDefinition | undefined {
  const normalized = normalizeStatusText(label);
  return PRODUCT_STATUSES.find((status) => normalizeStatusText(status.label) === normalized);
}
