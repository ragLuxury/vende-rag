import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { InfoScreen } from '@/src/features/info/presentation/components/info-screen';

export default function InformacionPage() {
  return (
    <AuthGuard mode="require-auth">
      <InfoScreen />
    </AuthGuard>
  );
}
