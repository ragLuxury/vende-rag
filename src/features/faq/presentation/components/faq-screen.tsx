'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { useFaqs } from '../hooks/use-faqs';
import { FaqAccordion } from './faq-accordion';

export function FaqScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useFaqs();

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
        <h1 className="text-lg font-semibold text-neutral-900">Preguntas Frecuentes</h1>
      </header>

      <div className="flex-1 px-6 pt-8 pb-28">
        <p className="font-editors text-4xl text-neutral-900">¿En qué podemos ayudarte?</p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma de consignación.
        </p>

        <hr className="my-8 border-neutral-200" />

        {isPending ? (
          <p className="text-center text-sm text-neutral-400">Cargando preguntas…</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-sm text-neutral-500">
              No pudimos cargar las preguntas frecuentes.
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
          <FaqAccordion items={data} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}
