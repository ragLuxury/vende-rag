import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

export async function validateResetTokenUseCase(
  repository: AuthRepository,
  token: string,
): Promise<string> {
  return repository.validateResetToken(token);
}
