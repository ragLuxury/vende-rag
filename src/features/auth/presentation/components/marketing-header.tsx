'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCurrentUser } from '../hooks/use-current-user';
import { NAV_LINKS } from './landing-content';
import { TopNavActions } from './top-nav-actions';

export function MarketingHeader() {
  const user = useCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Link href={user ? '/vender' : '/welcome'} aria-label="RAG" className="shrink-0">
          <Image
            src="/images/header/headerv2.png"
            alt="RAG"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {user ? (
          <TopNavActions />
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>

      <nav className="">
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
    </header>
  );
}
