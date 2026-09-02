'use client';

import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { EditAddressScreen } from '@/src/features/account/presentation/components/edit-address-screen';
import { queueToast } from '@/src/shared/ui/toast';

export default function EditarDireccionPage() {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      {user ? (
        <EditAddressScreen
          clientId={user.id}
          onSaved={() => {
            queueToast('Información actualizada correctamente');
            router.push('/perfil');
          }}
        />
      ) : null}
    </AuthGuard>
  );
}
