import type { AuthRepository, AuthUser } from '@/src/features/auth/domain/auth-repository';

export function updateCurrentUserUseCase(
  repository: AuthRepository,
  patch: Partial<AuthUser>,
): AuthUser | null {
  return repository.updateUser(patch);
}
