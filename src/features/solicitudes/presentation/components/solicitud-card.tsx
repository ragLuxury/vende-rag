'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Solicitud } from '@/src/features/solicitudes/domain/solicitud-repository';
import { getStatusStyle } from './solicitud-status';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

interface SolicitudCardProps {
  solicitud: Solicitud;
}

export function SolicitudCard({ solicitud }: SolicitudCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = solicitud.image !== '' && !imageFailed;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="relative aspect-square bg-neutral-100">
        {showImage ? (
          <Image
            src={solicitud.image}
            alt={solicitud.name}
            fill
            sizes="(max-width: 448px) 50vw, 224px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <Icon icon="ion:image-outline" className="size-10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="truncate text-sm font-semibold text-neutral-900">{solicitud.name}</h3>
        <p className="text-sm text-neutral-700">
          Precio de Venta:
          <span className="block font-semibold">{currencyFormatter.format(solicitud.price)}</span>
        </p>
        <p className="text-xs text-neutral-400">ID: {solicitud.id}</p>

        <span
          className={`mt-auto self-stretch rounded-full py-1.5 text-center text-sm font-medium ${getStatusStyle(
            solicitud.status,
          )}`}
        >
          {solicitud.status}
        </span>
      </div>
    </article>
  );
}
