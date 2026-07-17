'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

// The top-nav popup shows account profile display fields (first/last name); no shared
// abstraction exists yet for cross-feature profile reads, and `name` on AuthUser cannot
// be reliably split into first/last.
// eslint-disable-next-line boundaries/element-types
import { useProfileSummary } from '@/src/features/account/presentation/hooks/use-profile-summary';
import { useCurrentUser } from '../hooks/use-current-user';
import { useLogout } from '../hooks/use-logout';

interface MenuLink {
  label: string;
  href: string;
  icon: string;
}

const MENU_LINKS: readonly MenuLink[] = [
  { label: 'Mi Perfil', href: '/perfil', icon: 'ion:person-outline' },
  { label: 'Mis Solicitudes', href: '/solicitudes', icon: 'ion:document-text-outline' },
  { label: 'Mis Publicaciones', href: '/publicaciones', icon: 'ion:pricetag-outline' },
  { label: 'Mis Ventas', href: '/mis-ventas', icon: 'ion:bag-handle-outline' },
];

export function TopNavActions() {
  const user = useCurrentUser();
  const { data: summary } = useProfileSummary(user?.id ?? null);
  const logout = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const displayName = summary ? `${summary.firstName} ${summary.lastName}` : null;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/vender"
        className="bg-brand rounded-[8px] px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
      >
        Vender
      </Link>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Mi perfil"
          aria-expanded={menuOpen}
          className="relative flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <Icon icon="ion:person-circle-outline" className="size-7 text-neutral-700" />
          {displayName ? (
            <span className="absolute top-full right-0 mt-3 flex items-center gap-1 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
              {displayName}
              <Icon icon="ion:chevron-down-outline" className="size-3.5" />
            </span>
          ) : null}
        </button>

        {menuOpen ? (
          <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white py-4 shadow-lg">
            <div className="px-5 pb-3">
              <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                Bienvenido
              </p>
              {displayName ? (
                <p className="font-editors mt-1 truncate text-2xl text-neutral-900">
                  {displayName}
                </p>
              ) : null}
            </div>

            <div className="border-t border-neutral-200 py-2">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Icon icon={link.icon} className="size-5" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                <Icon icon="ion:log-out-outline" className="size-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
