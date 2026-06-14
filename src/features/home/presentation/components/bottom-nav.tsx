'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentType } from 'react';

import { HomeIcon, InfoIcon, SalesIcon, SellIcon, UserIcon } from './home-icons';

interface NavItem {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

const ITEMS: readonly NavItem[] = [
  { label: 'Inicio', href: '/', Icon: HomeIcon },
  { label: 'Información', href: '/informacion', Icon: InfoIcon },
  { label: 'Vender', href: '/vender', Icon: SellIcon },
  { label: 'Mis Ventas', href: '/mis-ventas', Icon: SalesIcon },
  { label: 'Mi perfil', href: '/perfil', Icon: UserIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-neutral-200 bg-white">
      <ul className="mx-auto flex w-full max-w-md items-center justify-between px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const color = active ? 'text-neutral-900' : 'text-neutral-400';
          const Icon = item.Icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-1"
              >
                <Icon className={`size-6 ${color}`} />
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
