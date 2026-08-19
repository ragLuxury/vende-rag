import { env } from '@/src/shared/infrastructure/env/env';

export function getContractUrl(filename: string): string {
  if (/^https?:\/\//i.test(filename)) return filename;
  return `${env.NEXT_PUBLIC_CONTRACT_BASE_URL}/${filename}`;
}
