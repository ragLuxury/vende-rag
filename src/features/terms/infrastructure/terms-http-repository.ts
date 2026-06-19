import type { TermsRepository } from '@/src/features/terms/domain/terms-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { pickEs } from '@/src/shared/infrastructure/i18n/pick-es';
import { termsResponseSchema } from './terms-schemas';

export const termsHttpRepository = {
  async getTerms(signal) {
    const response = await httpRequest('/web/terminos-y-condiciones', {
      schema: termsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item) => ({
      title: pickEs(item.title),
      terminos: pickEs(item.terminos),
      condiciones: pickEs(item.condiciones),
    }));
  },
} satisfies TermsRepository;
