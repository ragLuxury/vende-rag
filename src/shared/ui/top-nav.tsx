'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const ITEMS: readonly NavItem[] = [
  { label: 'Mis Solicitudes', href: '/solicitudes' },
  { label: 'Mis Publicaciones', href: '/publicaciones' },
  { label: 'Mis Ventas', href: '/mis-ventas' },
  { label: 'Mis Devoluciones', href: '/devoluciones' },
  { label: 'Mi Perfil', href: '/perfil' },
];

interface TopNavProps {
  trailing?: React.ReactNode;
}

export function TopNav({ trailing }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[110] hidden h-20 items-center gap-8 border-b border-neutral-200 bg-white px-8 md:flex">
      <Link href="/welcome" aria-label="RAG" className="shrink-0">
        <Image
          src="/images/headerv2.png"
          alt="RAG"
          width={160}
          height={36}
          priority
          className="h-8 w-auto"
        />
      </Link>

      <nav className="flex-1 overflow-x-auto">
        <ul className="flex items-center gap-1">
          {ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-neutral-100 font-medium text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0">
        {trailing ?? (
          <Link
            href="/vender"
            className="bg-brand rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Vender
          </Link>
        )}
      </div>
    </header>
  );
}
