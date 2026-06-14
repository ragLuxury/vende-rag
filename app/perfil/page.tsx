'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { useLogout } from '@/src/features/auth/presentation/hooks/use-logout';
import { ProfileScreen } from '@/src/features/account/presentation/components/profile-screen';

export default function PerfilPage() {
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <AuthGuard mode="require-auth">
      <ProfileScreen name={user?.name ?? ''} onLogout={logout} />
    </AuthGuard>
  );
}
