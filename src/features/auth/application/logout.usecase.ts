import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export function logoutUseCase(repository: AuthRepository): void {
  repository.logout();
}
