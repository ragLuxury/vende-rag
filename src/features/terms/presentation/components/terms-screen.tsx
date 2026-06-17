'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@/src/shared/ui/icons';
import { useTerms } from '../hooks/use-terms';

export function TermsScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useTerms();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <header className="relative flex items-center justify-center px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <ChevronLeftIcon className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Términos y Condiciones</h1>
      </header>

      <div className="flex-1 px-6 pt-8 pb-12">
        {isPending ? (
          <p className="text-center text-sm text-neutral-400">Cargando términos…</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-sm text-neutral-500">
              No pudimos cargar los términos y condiciones.
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
                dangerouslySetInnerHTML={{ __html: document.terminos }}
              />
              <div
                className="legal-content mt-8"
                dangerouslySetInnerHTML={{ __html: document.condiciones }}
              />
            </article>
          ))
        )}
      </div>
    </div>
  );
}
