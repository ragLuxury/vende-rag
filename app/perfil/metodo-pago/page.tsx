'use client';

import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { EditPaymentMethodScreen } from '@/src/features/account/presentation/components/edit-payment-method-screen';

export default function EditarMetodoPagoPage() {
  const user = useCurrentUser();

  return (
    <AuthGuard mode="require-auth">
      <EditPaymentMethodScreen clientId={user?.id ?? 0} />
    </AuthGuard>
  );
}
