'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { SolicitudesScreen } from '@/src/features/solicitudes/presentation/components/solicitudes-screen';

export default function SolicitudesPage() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <SolicitudesScreen clientId={user?.id ?? null} />
    </AuthGuard>
  );
}
