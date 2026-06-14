import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export function isAuthenticatedUseCase(repository: AuthRepository): boolean {
  return repository.getToken() !== null;
}
