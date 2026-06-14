'use client';

import type { ReactNode } from 'react';
import {
  useAuthGuard,
  type AuthGuardMode,
} from '@/src/features/auth/presentation/hooks/use-auth-guard';

interface AuthGuardProps {
  mode: AuthGuardMode;
  children: ReactNode;
}

export function AuthGuard({ mode, children }: AuthGuardProps) {
  const { checking } = useAuthGuard(mode);

  if (checking) return null;

  return <>{children}</>;
}
