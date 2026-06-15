import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { ContactScreen } from '@/src/features/contact/presentation/components/contact-screen';

export default function ContactoPage() {
  return (
    <AuthGuard mode="require-auth">
      <ContactScreen />
    </AuthGuard>
  );
}
