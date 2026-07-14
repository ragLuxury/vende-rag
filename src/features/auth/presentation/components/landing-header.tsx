'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useLoginModal } from '@/src/features/auth/presentation/login-modal-context';
import { NAV_LINKS } from './landing-content';

export function LandingHeader() {
  const { open } = useLoginModal();

  return (
    <header className="top-0 z-50 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <Icon icon="ion:diamond-outline" className="text-brand size-7" />
        <Image
          src="/images/headerv2.png"
          alt="RAG"
          width={140}
          height={32}
          priority
          className="h-15 w-auto"
        />
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={open}
            className="bg-brand rounded-[8px] px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Vender
          </button>
          <button type="button" onClick={open} aria-label="Iniciar sesión">
            <Icon icon="ion:person-circle-outline" className="size-7 text-neutral-700" />
          </button>
        </div>
      </div>

      <nav className="">
        <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-8 px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
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
