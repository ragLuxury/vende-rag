import type { PrivacyRepository } from '@/src/features/privacy/domain/privacy-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { pickEs } from '@/src/shared/infrastructure/i18n/pick-es';
import { privacyResponseSchema } from './privacy-schemas';

export const privacyHttpRepository = {
  async getPrivacy(signal) {
    const response = await httpRequest('/mobile/aviso-de-privacidad', {
      schema: privacyResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item) => ({
      title: pickEs(item.title),
      content: pickEs(item.content),
    }));
  },
} satisfies PrivacyRepository;
