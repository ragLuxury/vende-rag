import type { AuthRepository } from '@/src/features/auth/domain/auth-repository';

/**
 * A session is only usable when the token *and* the user are stored: every
 * private screen queries by the seller's id, so a token without a user leaves
 * those screens unable to ask for anything. Sign-in always writes both, so this
 * combination means the stored session is broken, not that the seller is out.
 */
export function hasCompleteSessionUseCase(repository: AuthRepository): boolean {
  return repository.getToken() !== null && repository.getUser() !== null;
}
