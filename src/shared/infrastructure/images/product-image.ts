import { env } from '@/src/shared/infrastructure/env/env';

export function getProductImageUrl(filename: string): string {
  return `${env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL}/${filename}`;
}
