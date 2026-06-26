'use client';

import { Suspense } from 'react';
import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { ResetPasswordForm } from '@/src/features/auth/presentation/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <AuthGuard mode="require-guest">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthGuard>
  );
}
