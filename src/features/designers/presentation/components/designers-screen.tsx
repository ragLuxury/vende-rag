'use client';

import { useMemo } from 'react';

import { useDesigners } from '../hooks/use-designers';

export function DesignersScreen() {
  const { data, isPending, isError, refetch } = useDesigners();

  const designers = useMemo(
    () => (data ? [...data].sort((a, b) => a.name.localeCompare(b.name)) : []),
    [data],
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 md:px-8 md:py-20">
      <h1 className="font-editors text-center text-2xl text-neutral-900 md:text-5xl">
        Directorio de Diseñadores
      </h1>

      <div className="mt-12 md:mt-16">
        {isPending ? (
          <p className="text-center text-sm text-neutral-400">Cargando diseñadores…</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-sm text-neutral-500">
              No pudimos cargar el catálogo de diseñadores.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-sm font-medium underline"
            >
              Reintentar
            </button>
          </div>
        ) : designers.length === 0 ? (
          <p className="text-center text-sm text-neutral-500">
            Aún no hay diseñadores disponibles.
          </p>
        ) : (
          <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3">
            {designers.map((designer) => (
              <li
                key={designer.id}
                className="break-inside-avoid py-3 text-center text-neutral-700"
              >
                {designer.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
