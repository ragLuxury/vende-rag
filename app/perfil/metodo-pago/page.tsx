'use client';

import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { EditPaymentMethodScreen } from '@/src/features/account/presentation/components/edit-payment-method-screen';
import { queueToast } from '@/src/shared/ui/toast';

export default function EditarMetodoPagoPage() {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <EditPaymentMethodScreen
        clientId={user?.id ?? 0}
        onSaved={() => {
          queueToast('Información actualizada correctamente');
          router.push('/perfil');
        }}
      />
    </AuthGuard>
  );
}
