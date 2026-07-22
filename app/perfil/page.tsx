'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { useLogout } from '@/src/features/auth/presentation/hooks/use-logout';
import { useUpdateCurrentUser } from '@/src/features/auth/presentation/hooks/use-update-current-user';
import { ProfileScreen } from '@/src/features/account/presentation/components/profile-screen';

export default function PerfilPage() {
  const user = useCurrentUser();
  const logout = useLogout();
  const updateCurrentUser = useUpdateCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <ProfileScreen
        name={user?.name ?? ''}
        clientId={user?.id ?? 0}
        onLogout={logout}
        onDeleted={logout}
        onProfileSaved={(fullName) => updateCurrentUser({ name: fullName })}
      />
    </AuthGuard>
  );
}
