'use client';

import type { FormEvent } from 'react';
import Image from 'next/image';
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
    <>
      <footer className="bg-neutral-50">
        <div className="mx-auto w-full max-w-6xl px-8 py-10 text-center">
          <h2 className="font-cormorant text-3xl font-semibold text-neutral-900">
            Síguenos <span className="font-normal italic">y Suscríbete</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Únete a nuestra comunidad, regístrate para recibir nuestro newsletter periódicamente.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mx-auto mt-6 flex max-w-150 items-stretch overflow-hidden rounded-full border border-neutral-300 bg-white focus-within:border-neutral-500"
          >
            <input
              type="email"
              required
              placeholder="Ingresa tu correo electrónico"
              className="flex-1 bg-transparent px-5 py-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brand px-6 py-1.5 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
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
                className="group relative text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <span
                  role="tooltip"
                  className="pointer-events-none invisible absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
                >
                  {social.label}
                </span>
                <Icon icon={social.icon} className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 bg-neutral-50 pt-4">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-around gap-4 px-8 md:flex-row md:gap-8">
            {footerColumns.map((column) => (
              <nav key={column.title}>
                <p className="text-center text-xs font-semibold tracking-[0.2em] text-neutral-900 uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col items-center gap-1">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="w-full bg-white">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-8 pt-4 pb-4">
              <Image
                src="/images/footer/logo-footer.svg"
                alt="RAG"
                width={250}
                height={53}
                className="h-auto w-[15%]"
              />
              <p className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <Link href="/terminos" className="transition-colors hover:text-neutral-700">
                  Términos y Condiciones
                </Link>
                <span>|</span>
                <Link href="/privacidad" className="transition-colors hover:text-neutral-700">
                  Políticas de Privacidad
                </Link>
                <span>|</span>
                <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        className="text-brand fixed right-6 bottom-6 z-50"
      >
        <Icon icon="ion:chevron-up-outline" className="size-8 cursor-pointer" />
      </button>
    </>
  );
}
