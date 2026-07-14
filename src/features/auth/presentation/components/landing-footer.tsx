'use client';

import type { FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from './landing-content';

export function LandingFooter() {
  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
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

        <div className="mt-8 flex justify-center gap-5">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <Icon icon={social.icon} className="size-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-4 gap-8 px-8">
          <Image
            src="/images/headerv2.png"
            alt="RAG"
            width={140}
            height={32}
            className="h-7 w-auto"
          />
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title}>
              <p className="text-xs font-semibold tracking-wide text-neutral-900 uppercase">
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
        <p className="mt-10 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} RAG
        </p>
      </div>
    </footer>
  );
}
