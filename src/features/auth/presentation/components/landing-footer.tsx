'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getFooterColumns, SOCIAL_LINKS } from './landing-content';

interface LandingFooterProps {
  isAuthenticated: boolean;
}

export function LandingFooter({ isAuthenticated }: LandingFooterProps) {
  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const footerColumns = getFooterColumns(isAuthenticated);

  return (
    <footer className="bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-8 py-16 text-center">
        <h2 className="font-editors text-3xl text-neutral-900">
          Síguenos <span className="italic">y Suscríbete</span>
        </h2>
        <p className="mt-3 text-sm text-neutral-500">
          Únete a nuestra comunidad, regístrate para recibir nuestro newsletter periódicamente.
        </p>

        <form
          onSubmit={handleNewsletterSubmit}
          className="mx-auto mt-6 flex max-w-md items-stretch overflow-hidden rounded-full border border-neutral-300 bg-white focus-within:border-neutral-500"
        >
          <input
            type="email"
            required
            placeholder="Ingresa tu correo electrónico"
            className="flex-1 bg-transparent px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-brand px-6 py-3 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Confirmar
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <Icon icon={social.icon} className="size-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-around gap-8 px-8 md:flex-row">
          {footerColumns.map((column) => (
            <nav key={column.title}>
              <p className="text-sm font-semibold tracking-[0.2em] text-neutral-900 uppercase">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-8">
          <p className="text-xs text-neutral-400">© {new Date().getFullYear()} RAG</p>
        </div>
      </div>
    </footer>
  );
}
