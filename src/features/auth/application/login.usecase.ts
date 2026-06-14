import type {
  AuthRepository,
  AuthSession,
  LoginCredentials,
} from '@/src/features/auth/domain/auth-repository';

export async function loginUseCase(
  repository: AuthRepository,
  credentials: LoginCredentials,
): Promise<AuthSession> {
  return repository.login(credentials);
}
