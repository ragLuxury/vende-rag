import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { UnauthorizedError } from '@/src/shared/domain/errors';

/**
 * Called when the API rejects a request with 401 while the browser still holds
 * a token: the session expired or was revoked server-side.
 */
export type UnauthorizedHandler = () => void;

function isUnauthorized(error: unknown): boolean {
  return error instanceof UnauthorizedError;
}

export function createQueryClient(onUnauthorized: UnauthorizedHandler): QueryClient {
  const reportUnauthorized = (error: unknown) => {
    if (isUnauthorized(error)) onUnauthorized();
  };

  return new QueryClient({
    queryCache: new QueryCache({ onError: reportUnauthorized }),
    mutationCache: new MutationCache({ onError: reportUnauthorized }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        // Retrying a 401 only delays the redirect: the token will not become
        // valid on a second attempt.
        retry: (failureCount, error) => !isUnauthorized(error) && failureCount < 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
