import { env } from '@/src/shared/infrastructure/env/env';

export function getContractUrl(filename: string): string {
  return `${env.NEXT_PUBLIC_CONTRACT_BASE_URL}/${filename}`;
}
