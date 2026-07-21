'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// The authenticated header also carries the landing page's anchor-link nav strip; no shared
// abstraction exists yet for cross-feature nav content, and the anchor targets only exist on
// `/welcome`.
// eslint-disable-next-line boundaries/element-types
import { NAV_LINKS } from '@/src/features/auth/presentation/components/landing-content';

interface TopNavProps {
  trailing?: React.ReactNode;
}

// Mirrors `TABS` in `account-tabs.tsx` — the nav strip's anchors only resolve on `/welcome`,
// so it must stay hidden on the dashboard's folder-tab routes.
const DASHBOARD_TAB_PATHS: readonly string[] = [
  '/perfil',
  '/solicitudes',
  '/publicaciones',
  '/mis-ventas',
  '/devoluciones',
];

export function TopNav({ trailing }: TopNavProps) {
  const pathname = usePathname();
  const hideNavStrip = DASHBOARD_TAB_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <header
      className={`relative z-[150] bg-white/90 backdrop-blur ${
        hideNavStrip ? 'shadow-[0_6px_14px_-12px_rgba(0,0,0,0.25)]' : 'border-b border-neutral-200'
      }`}
    >
      <div className="mx-auto hidden h-26 w-full items-start mt-[15px] justify-between px-4 md:flex">
        <Image src="/images/header/isotipo.svg" alt="" width={48} height={48} className="size-10" />

        <Link href="/welcome" aria-label="RAG">
          <Image
            src="/images/header/headerv2.png"
            alt="RAG"
            width={245}
            height={56}
            priority
            className="h-[95px] w-auto ml-[65px]"
          />
        </Link>

        <div className="flex items-center gap-5">
          {trailing ?? (
            <Link
              href="/vender"
              className="bg-brand rounded-[8px] px-5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
            >
              Vender
            </Link>
          )}
        </div>
      </div>

      {!hideNavStrip ? (
        <nav className="hidden md:block">
          <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-8 px-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={`/welcome${link.href}`}
                className="text-xs font-medium tracking-wide text-neutral-600 uppercase transition-colors hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
