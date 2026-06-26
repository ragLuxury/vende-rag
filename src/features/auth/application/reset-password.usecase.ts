import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export async function resetPasswordUseCase(
  repository: AuthRepository,
  token: string,
  newPassword: string,
): Promise<void> {
  await repository.resetPassword(token, newPassword);
}
