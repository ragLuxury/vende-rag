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
  heightPx?: number | undefined;
}

export function ProductCard({
  product,
  secondary,
  showReceivedDisclaimer,
  heightPx = 360,
}: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.image !== '' && !imageFailed;

  const isReceived = product.status.trim().toLowerCase() === 'recibido';
  const pillStatus =
    isReceived && product.statusIntern
      ? resolvePublicationPillLabel(product.statusIntern)
      : product.status;
  const isPreaprobada = pillStatus.trim().toLowerCase() === 'preaprobado';

  return (
    <article
      className="flex w-[192px] flex-col rounded-[20px] border border-[#ececec] bg-white p-4 transition-all duration-200 ease-out hover:-translate-y-0.5"
      style={{ minHeight: `${heightPx}px` }}
    >
      <p className="mt-[7px] mb-[10px] ml-3 text-[10px] text-[#9A9A9A]">#{product.id}</p>

      <div className="relative mx-auto aspect-square w-[160px] overflow-hidden rounded-[14px] bg-neutral-100">
        {showImage ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="200px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <Icon icon="ion:image-outline" className="size-10" />
          </div>
        )}
      </div>

      <h3 className="mt-[15px] ml-3 truncate text-[13px] font-light leading-[1.25] tracking-[-0.01em] text-[#1F1F1F]">
        {product.name}
      </h3>
      <p className="mt-[12px] ml-3 text-[13px] leading-none tracking-[-0.03em] text-[#151515]">
        {currencyFormatter.format(secondary.value)}
      </p>
      <p className="mt-[15px] ml-3 text-[12px] leading-[1.4] text-[#777777]">
        Ganancia: {currencyFormatter.format(product.earning)}
      </p>

      {showReceivedDisclaimer ? (
        <p
          className={`mt-[5px] ml-3 flex items-center gap-1 text-[9px] leading-[1.4] text-[#8C8C8C]${isPreaprobada ? '' : ' invisible'}`}
        >
          <Icon icon="ion:information-circle-outline" className="size-3 shrink-0" />
          Recibido en tienda
        </p>
      ) : null}

      <span
        className="mt-[10px] w-full rounded-full py-[7px] text-center text-[12px] font-medium"
        style={getStatusStyle(pillStatus)}
      >
        {pillStatus}
      </span>
    </article>
  );
}
