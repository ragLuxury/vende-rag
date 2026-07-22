'use client';

import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { useUpdateCurrentUser } from '@/src/features/auth/presentation/hooks/use-update-current-user';
import { EditProfileScreen } from '@/src/features/account/presentation/components/edit-profile-screen';
import { queueToast } from '@/src/shared/ui/toast';

export default function EditarPerfilPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const updateCurrentUser = useUpdateCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <EditProfileScreen
        clientId={user?.id ?? 0}
        onSaved={(fullName) => {
          updateCurrentUser({ name: fullName });
          queueToast('Información actualizada correctamente');
          router.push('/perfil');
        }}
      />
    </AuthGuard>
  );
}
