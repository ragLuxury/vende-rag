import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export async function forgotPasswordUseCase(
  repository: AuthRepository,
  email: string,
): Promise<void> {
  await repository.forgotPassword(email);
}
