'use client';

import { use } from 'react';
import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { LegacyProductRedirect } from '@/src/features/product-views/presentation/components/legacy-product-redirect';

export default function CuentaProductoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; back?: string }>;
}) {
  const { id, back } = use(searchParams);

  return (
    <AuthGuard mode="require-auth">
      <LegacyProductRedirect uuid={id ?? ''} view={back || 'solicitudes'} />
    </AuthGuard>
  );
}
