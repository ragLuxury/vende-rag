'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

import { usePrivacy } from '../hooks/use-privacy';

export function PrivacyScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = usePrivacy();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <header className="relative flex items-center justify-center px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Aviso de Privacidad</h1>
      </header>

      <div className="flex-1 px-6 pt-8 pb-12">
        {isPending ? (
          <p className="text-center text-sm text-neutral-400">Cargando aviso…</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-sm text-neutral-500">
              No pudimos cargar el aviso de privacidad.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-sm font-medium underline"
            >
              Reintentar
            </button>
          </div>
        ) : (
          data.map((document, index) => (
            <article key={index} className={index > 0 ? 'mt-12' : undefined}>
              <h2 className="font-editors text-3xl leading-tight text-neutral-900">
                {document.title}
              </h2>

              <hr className="my-8 border-neutral-200" />

              <div
                className="legal-content"
                dangerouslySetInnerHTML={{ __html: document.content }}
              />
            </article>
          ))
        )}
      </div>
    </div>
  );
}
