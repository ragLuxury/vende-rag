export interface ResolvedPayment {
  readonly isPaid: boolean;
  readonly paid: number;
  readonly pending: number;
}

/**
 * A raw backend status containing "pagado" is the source of truth for
 * whether a sale is paid, even when no itemized seller-payment transaction
 * is on file yet (legacy/simplified sales recorded without granular
 * payment records).
 */
export function isPaidStatus(status: string): boolean {
  return status.trim().toLowerCase().includes('pagado');
}

/**
 * Resolves the paid/pending seller-payout amounts for a product.
 *
 * When the raw status already says "pagado" but no itemized payment total
 * is on file, the full `earning` is treated as paid instead of pending.
 */
export function resolvePayment(
  status: string,
  earning: number,
  itemizedPaid: number,
): ResolvedPayment {
  if (isPaidStatus(status)) {
    const paid = itemizedPaid > 0 ? itemizedPaid : earning;
    return { isPaid: true, paid, pending: 0 };
  }
  return { isPaid: false, paid: itemizedPaid, pending: Math.max(earning - itemizedPaid, 0) };
}
