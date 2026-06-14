'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { HomeScreen } from '@/src/features/home/presentation/components/home-screen';

export default function Home() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <HomeScreen name={user?.name ?? ''} />
    </AuthGuard>
  );
}
