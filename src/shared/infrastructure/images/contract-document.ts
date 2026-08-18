import { env } from '@/src/shared/infrastructure/env/env';

export function getContractUrl(filename: string): string {
  const value = filename.trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `${env.NEXT_PUBLIC_CONTRACT_BASE_URL.replace(/\/$/, '')}/${value.replace(/^\//, '')}`;
}
