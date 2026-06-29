'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Product } from '@/src/features/product-views/domain/product-view-repository';
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
}

export function ProductCard({ product, secondary }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.image !== '' && !imageFailed;

  const isReceived = product.status.trim().toLowerCase() === 'recibido';
  const pillStatus = isReceived && product.statusIntern ? product.statusIntern : product.status;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="relative aspect-square bg-neutral-100">
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
        <p className="text-xs text-neutral-400">ID: {product.id}</p>

        <span
          className="mt-auto self-stretch rounded-full py-1.5 text-center text-sm font-medium"
          style={getStatusStyle(pillStatus)}
        >
          {pillStatus}
        </span>
      </div>
    </article>
  );
}
