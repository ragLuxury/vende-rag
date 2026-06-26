'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { EditAddressScreen } from '@/src/features/account/presentation/components/edit-address-screen';

export default function EditarDireccionPage() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <EditAddressScreen clientId={user?.id ?? 0} />
    </AuthGuard>
  );
}
