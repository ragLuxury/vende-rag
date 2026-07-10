'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { NewListingScreen } from '@/src/features/listings/presentation/components/new-listing-screen';

export default function VenderPage() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <NewListingScreen userId={user?.id ?? null} userEmail={user?.email ?? null} />
    </AuthGuard>
  );
}
