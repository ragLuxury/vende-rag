import type { AuthRepository, AuthUser } from '@/src/features/auth/domain/auth-repository';

export function getCurrentUserUseCase(repository: AuthRepository): AuthUser | null {
  return repository.getUser();
}
