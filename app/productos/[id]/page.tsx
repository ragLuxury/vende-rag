'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { ProductDetailScreen } from '@/src/features/product-views/presentation/components/product-detail-screen';

export default function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = use(params);
  const { view } = use(searchParams);
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) notFound();

  return (
    <AuthGuard mode="require-auth">
      <ProductDetailScreen productId={productId} {...(view ? { view } : {})} />
    </AuthGuard>
  );
}
