export interface TermsDocument {
  title: string;
  terminos: string;
  condiciones: string;
}

export interface TermsRepository {
  getTerms(signal?: AbortSignal): Promise<readonly TermsDocument[]>;
}
