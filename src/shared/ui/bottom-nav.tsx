'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const ITEMS: readonly NavItem[] = [
  { label: 'Inicio', href: '/', icon: 'ion:home-outline' },
  { label: 'Información', href: '/informacion', icon: 'ion:information-circle-outline' },
  { label: 'Vender', href: '/vender', icon: 'ion:add-circle-outline' },
  { label: 'Mis Ventas', href: '/mis-ventas', icon: 'ion:bag-handle-outline' },
  { label: 'Mi perfil', href: '/perfil', icon: 'ion:person-outline' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[110] border-t border-neutral-200 bg-white md:hidden">
      <ul className="mx-auto flex w-full max-w-md items-center justify-between px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const color = active ? 'text-neutral-900' : 'text-neutral-400';

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-1"
              >
                <Icon icon={item.icon} className={`size-6 ${color}`} />
                <span className={`text-xs ${active ? 'font-medium' : ''} ${color}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
