import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { FaqScreen } from '@/src/features/faq/presentation/components/faq-screen';

export default function PreguntasFrecuentesPage() {
  return (
    <AuthGuard mode="require-auth">
      <FaqScreen />
    </AuthGuard>
  );
}
