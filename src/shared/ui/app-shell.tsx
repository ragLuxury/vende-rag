'use client';

import { usePathname } from 'next/navigation';
import { TopNav } from './top-nav';

const AUTH_PATHS: readonly string[] = [
  '/welcome',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

const BARE_PREFIXES: readonly string[] = ['/productos/'];

interface AppShellProps {
  children: React.ReactNode;
  topRight?: React.ReactNode;
}

export function AppShell({ children, topRight }: AppShellProps) {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isBare = BARE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isAuth || isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNav {...(topRight ? { trailing: topRight } : {})} />
      <div className="flex min-h-full flex-1 flex-col md:pt-20">{children}</div>
    </>
  );
}
