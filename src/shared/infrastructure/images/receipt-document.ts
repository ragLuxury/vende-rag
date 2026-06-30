import { env } from '@/src/shared/infrastructure/env/env';

export function getReceiptUrl(path: string): string {
  return `${env.NEXT_PUBLIC_RECEIPT_BASE_URL}/${path.replace(/^\/+/, '')}`;
}
