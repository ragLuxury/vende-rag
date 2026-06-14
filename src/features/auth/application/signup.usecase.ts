import type {
  AuthRepository,
  RegistrationData,
  RegistrationResult,
} from '@/src/features/auth/domain/auth-repository';

export async function signupUseCase(
  repository: AuthRepository,
  data: RegistrationData,
): Promise<RegistrationResult> {
  return repository.register(data);
}
