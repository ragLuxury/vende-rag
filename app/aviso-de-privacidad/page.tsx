import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { PrivacyScreen } from '@/src/features/privacy/presentation/components/privacy-screen';

export default function AvisoDePrivacidadPage() {
  return (
    <AuthGuard mode="require-auth">
      <PrivacyScreen />
    </AuthGuard>
  );
}
