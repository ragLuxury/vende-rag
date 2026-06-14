import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { SignupForm } from '@/src/features/auth/presentation/components/signup-form';

export default function SignupPage() {
  return (
    <AuthGuard mode="require-guest">
      <SignupForm />
    </AuthGuard>
  );
}
