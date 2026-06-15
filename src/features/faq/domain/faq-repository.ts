export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRepository {
  getFaqs(signal?: AbortSignal): Promise<readonly FaqItem[]>;
}
