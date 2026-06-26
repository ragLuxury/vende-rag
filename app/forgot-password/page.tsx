import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { ForgotPasswordForm } from '@/src/features/auth/presentation/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <AuthGuard mode="require-guest">
      <ForgotPasswordForm />
    </AuthGuard>
  );
}
