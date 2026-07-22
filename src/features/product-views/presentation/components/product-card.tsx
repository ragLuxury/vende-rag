'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Product } from '@/src/features/product-views/domain/product-view-repository';
import { resolvePublicationPillLabel } from '@/src/features/product-views/domain/publication-status';
import { getStatusStyle } from './product-status';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

interface CardSecondary {
  label: string;
  value: number;
}

interface ProductCardProps {
  product: Product;
  secondary: CardSecondary;
  showReceivedDisclaimer: boolean;
}

export function ProductCard({ product, secondary, showReceivedDisclaimer }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.image !== '' && !imageFailed;

  const isReceived = product.status.trim().toLowerCase() === 'recibido';
  const pillStatus =
    isReceived && product.statusIntern
      ? resolvePublicationPillLabel(product.statusIntern)
      : product.status;
  const isPreaprobada = pillStatus.trim().toLowerCase() === 'preaprobada';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-neutral-300">
      <div className="relative aspect-[1.3] bg-neutral-100">
        {showImage ? (
          <Image
            src={product.image}
            alt={product.name}
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
        <h3 className="truncate text-sm font-semibold text-neutral-900">{product.name}</h3>
        <p className="text-sm text-neutral-900">
          Tu Ganancia:{' '}
          <span className="font-semibold">{currencyFormatter.format(product.earning)}</span>
        </p>
        <p className="text-sm text-neutral-500">
          {secondary.label}: {currencyFormatter.format(secondary.value)}
        </p>
        <p className="mb-2 text-xs text-neutral-400">ID: {product.id}</p>


        {isPreaprobada && showReceivedDisclaimer ? (
          <p className=" flex items-center justify-center gap-1 text-center text-[10px] text-neutral-400">
            <Icon icon="ion:information-circle-outline" className="size-3 shrink-0" />
            Recibido en tienda
          </p>
        ) : null}

        <span
          className="mt-auto w-40 self-center rounded-full py-1.5 text-center text-sm font-medium"
          style={getStatusStyle(pillStatus)}
        >
          {pillStatus}
        </span>
      </div>
    </article>
  );
}
