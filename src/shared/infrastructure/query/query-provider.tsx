'use client';

import { useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { tokenStorage } from '@/src/shared/infrastructure/http/token-storage';
import { userStorage } from '@/src/shared/infrastructure/http/user-storage';
import { createQueryClient } from './query-client';

const SIGNED_OUT_ROUTE = '/welcome';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() =>
    createQueryClient(() => {
      // A 401 without a stored token is a failed sign-in, not an expired
      // session — redirecting there would wipe the login form's error message.
      // Only a 401 on a request that carried a token means the session died.
      if (tokenStorage.get() === null) return;

      tokenStorage.clear();
      userStorage.clear();

      // A full navigation on purpose: it drops the query cache and every piece
      // of component state still holding the previous session's data.
      window.location.replace(SIGNED_OUT_ROUTE);
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
