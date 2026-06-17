import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { TermsScreen } from '@/src/features/terms/presentation/components/terms-screen';

export default function TerminosPage() {
  return (
    <AuthGuard mode="require-auth">
      <TermsScreen />
    </AuthGuard>
  );
}
