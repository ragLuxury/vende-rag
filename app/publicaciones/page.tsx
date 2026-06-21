'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { ProductsScreen } from '@/src/features/product-views/presentation/components/products-screen';

export default function PublicacionesPage() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <ProductsScreen view="publicaciones" clientId={user?.id ?? null} />
    </AuthGuard>
  );
}
