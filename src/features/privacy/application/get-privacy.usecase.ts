import type {
  PrivacyDocument,
  PrivacyRepository,
} from '@/src/features/privacy/domain/privacy-repository';

export async function getPrivacyUseCase(
  repository: PrivacyRepository,
  signal?: AbortSignal,
): Promise<readonly PrivacyDocument[]> {
  return repository.getPrivacy(signal);
}
