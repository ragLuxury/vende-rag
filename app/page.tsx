'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthGuard } from '@/src/features/auth/presentation/components/auth-guard';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { HomeScreen } from '@/src/features/home/presentation/components/home-screen';

const DESKTOP_QUERY = '(min-width: 768px)';

export default function Home() {
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const redirectIfDesktop = () => {
      if (media.matches) router.replace('/solicitudes');
    };

    redirectIfDesktop();
    media.addEventListener('change', redirectIfDesktop);
    return () => media.removeEventListener('change', redirectIfDesktop);
  }, [router]);

  return (
    <AuthGuard mode="require-auth">
      <div className="flex min-h-full flex-1 flex-col md:hidden">
        <HomeScreen name={user?.name ?? ''} />
      </div>
    </AuthGuard>
  );
}
