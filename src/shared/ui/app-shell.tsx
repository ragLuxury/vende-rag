'use client';

import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
import { TopNav } from './top-nav';

const STANDALONE_PATHS: readonly string[] = [
  '/welcome',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/disenadores',
];

interface AppShellProps {
  children: React.ReactNode;
  topRight?: React.ReactNode;
}

export function AppShell({ children, topRight }: AppShellProps) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const isStandalone = STANDALONE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isStandalone || !user) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNav {...(topRight ? { trailing: topRight } : {})} />
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
    </>
  );
}
