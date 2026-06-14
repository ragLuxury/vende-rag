import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { WelcomeScreen } from '@/src/features/auth/presentation/components/welcome-screen';

export default function WelcomePage() {
  return (
    <AuthGuard mode="require-guest">
      <WelcomeScreen />
    </AuthGuard>
  );
}
