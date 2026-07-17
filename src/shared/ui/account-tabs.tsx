'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabItem {
  label: string;
  href: string;
}

const TABS: readonly TabItem[] = [
  { label: 'Mi Perfil', href: '/perfil' },
  { label: 'Mis Solicitudes', href: '/solicitudes' },
  { label: 'Mis Publicaciones', href: '/publicaciones' },
  { label: 'Mis Ventas', href: '/mis-ventas' },
  { label: 'Mis Devoluciones', href: '/devoluciones' },
];

// "Folder tab" look: each tab is boxed on three sides, and the active tab's
// bottom border is painted white to melt into the divider/content panel
// below it (-mb-px overlaps that divider by exactly its 1px width).
export function AccountTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-end gap-1.5 border-b border-neutral-200">
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={`-mb-px rounded-t-xl border px-5 py-2.5 text-xs font-medium tracking-widest whitespace-nowrap uppercase transition-colors ${
              active
                ? 'border-neutral-200 border-b-white bg-white text-neutral-900'
                : 'border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-600'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
