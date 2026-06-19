import type { FaqRepository } from '@/src/features/faq/domain/faq-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { faqResponseSchema } from './faq-schemas';

export const faqHttpRepository = {
  async getFaqs(signal) {
    const response = await httpRequest('/web/faq', {
      schema: faqResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item, index) => ({
      id: String(index),
      question: item.question,
      answer: item.answer,
    }));
  },
} satisfies FaqRepository;
