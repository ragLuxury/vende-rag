'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { useUpdateCurrentUser } from '@/src/features/auth/presentation/hooks/use-update-current-user';
import { EditProfileScreen } from '@/src/features/account/presentation/components/edit-profile-screen';

export default function EditarPerfilPage() {
  const user = useCurrentUser();
  const updateCurrentUser = useUpdateCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <EditProfileScreen
        clientId={user?.id ?? 0}
        onSaved={(fullName) => updateCurrentUser({ name: fullName })}
      />
    </AuthGuard>
  );
}
