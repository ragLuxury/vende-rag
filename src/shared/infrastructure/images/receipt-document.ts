import { env } from '@/src/shared/infrastructure/env/env';

/**
 * A receipt lives either in R2 (uploaded by the batch import) or on the legacy
 * admin site, and only the API knows which. It resolves `receipt_url` for us;
 * `receipt_path` is the raw storage key and is kept as a fallback for API
 * versions that predate that field, where every receipt is a legacy one.
 */
export function resolveReceiptUrl(payment: {
  receipt_url?: string | null | undefined;
  receipt_path?: string | null | undefined;
}): string | null {
  const resolved = payment.receipt_url?.trim();
  if (resolved) return resolved;

  const path = payment.receipt_path?.trim();
  return path ? getLegacyReceiptUrl(path) : null;
}

export function getLegacyReceiptUrl(path: string): string {
  return `${env.NEXT_PUBLIC_RECEIPT_BASE_URL}/${path.replace(/^\/+/, '')}`;
}
