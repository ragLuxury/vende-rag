import type {
  AuthRepository,
  AuthSession,
  GoogleLoginData,
} from '@/src/features/auth/domain/auth-repository';

export async function loginWithGoogleUseCase(
  repository: AuthRepository,
  data: GoogleLoginData,
): Promise<AuthSession> {
  return repository.loginWithGoogle(data);
}
