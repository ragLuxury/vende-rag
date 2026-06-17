export interface PrivacyDocument {
  title: string;
  content: string;
}

export interface PrivacyRepository {
  getPrivacy(signal?: AbortSignal): Promise<readonly PrivacyDocument[]>;
}
