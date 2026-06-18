'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { useSolicitudes } from '../hooks/use-solicitudes';
import { SolicitudCard } from './solicitud-card';
import { SolicitudSummary, type SummaryItem } from './solicitud-summary';
import { matchesStatus } from './solicitud-status';

type SortOrder = 'desc' | 'asc';

const SEARCH_DEBOUNCE_MS = 400;

interface SolicitudesScreenProps {
  clientId: number | null;
}

export function SolicitudesScreen({ clientId }: SolicitudesScreenProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data: solicitudes, isLoading, isError } = useSolicitudes(clientId, debouncedSearch);

  const summary = useMemo<readonly SummaryItem[]>(() => {
    const list = solicitudes ?? [];
    return [
      {
        label: 'Aprobada',
        status: 'Aprobada',
        icon: 'ion:checkmark-circle-outline',
        count: list.filter((item) => matchesStatus(item.status, 'Aprobada')).length,
      },
      {
        label: 'Negociación',
        status: 'Negociación',
        icon: 'ion:sync-outline',
        count: list.filter((item) => matchesStatus(item.status, 'Negociación')).length,
      },
      {
        label: 'En Revisión',
        status: 'En revisión',
        icon: 'ion:refresh-outline',
        count: list.filter((item) => matchesStatus(item.status, 'En revisión')).length,
      },
    ];
  }, [solicitudes]);

  const visibleSolicitudes = useMemo(() => {
    const filtered = (solicitudes ?? []).filter(
      (item) => statusFilter === null || matchesStatus(item.status, statusFilter),
    );

    return [...filtered].sort((a, b) =>
      sortOrder === 'desc' ? b.price - a.price : a.price - b.price,
    );
  }, [solicitudes, sortOrder, statusFilter]);

  function handleStatusSelect(status: string) {
    setStatusFilter((current) => (current === status ? null : status));
  }

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
        <h1 className="text-lg font-semibold text-neutral-900">Solicitudes</h1>
      </header>

      <div className="flex-1 px-6 pt-6 pb-28">
        <div className="relative">
          <Icon
            icon="ion:search-outline"
            className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar solicitudes"
            placeholder="Busca tus solicitudes"
            className="focus:border-brand w-full rounded-full border border-neutral-200 bg-neutral-50 py-3.5 pr-4 pl-11 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <SolicitudSummary
            items={summary}
            selectedStatus={statusFilter}
            onSelect={handleStatusSelect}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setSortOrder((current) => (current === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-2 text-base text-neutral-700"
          >
            Ordenar por
            <Icon icon="ion:funnel-outline" className="size-5" />
          </button>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <p className="py-12 text-center text-sm text-neutral-400">Cargando solicitudes...</p>
          ) : isError ? (
            <p className="py-12 text-center text-sm text-red-600">
              No pudimos cargar tus solicitudes. Inténtalo de nuevo.
            </p>
          ) : visibleSolicitudes.length === 0 ? (
            <p className="py-12 text-center text-sm text-neutral-400">
              No tienes solicitudes todavía.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {visibleSolicitudes.map((solicitud) => (
                <SolicitudCard key={solicitud.id} solicitud={solicitud} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
