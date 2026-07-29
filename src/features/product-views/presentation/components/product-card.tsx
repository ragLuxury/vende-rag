'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type {
  Product,
  ProductView,
} from '@/src/features/product-views/domain/product-view-repository';
import { resolvePublicationPillLabel } from '@/src/features/product-views/domain/publication-status';
import { getStatusStyle } from './product-status';
import { ShippingOptionsModal } from './shipping-options-modal';

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
  view: ProductView;
  heightPx?: number | undefined;
}

export function ProductCard({ product, secondary, view, heightPx = 360 }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const showImage = product.image !== '' && !imageFailed;

  const isReceived = product.status.trim().toLowerCase() === 'recibido';
  const pillStatus =
    isReceived && product.statusIntern
      ? resolvePublicationPillLabel(product.statusIntern)
      : product.status;
  const isPreaprobada = pillStatus.trim().toLowerCase() === 'preaprobado';

  return (
    <>
      <article
        className="flex w-[192px] flex-col rounded-[20px] border border-[#ececec] bg-white p-4 transition-all duration-200 ease-out hover:-translate-y-0.5"
        style={{ minHeight: `${heightPx}px` }}
      >
        <div className="mt-[7px] mb-[10px] ml-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <p className="text-[10px] text-[#9A9A9A]">#{product.id}</p>
          </span>
          {isPreaprobada ? (
            <span className="group relative">
              <Icon
                icon={view === 'solicitudes' ? "ion:send-outline" : "ion:information-circle-outline"}
                className="size-4 shrink-0 cursor-pointer transition-all hover:scale-125"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (view === 'publicaciones') {
                    setShowInfoTooltip((prev) => !prev);
                  } else {
                    setIsShippingModalOpen(true);
                  }
                }}
              />
              {view === 'publicaciones' ? (
                <>
                  <span className="absolute top-full right-0 z-10 mt-1 hidden rounded-md bg-[#1F1F1F] px-2 py-1 text-[10px] whitespace-nowrap text-white md:group-hover:block">
                    Recibido en tienda
                  </span>
                  {showInfoTooltip ? (
                    <span className="absolute top-full right-0 z-10 mt-1 rounded-md bg-[#1F1F1F] px-2 py-1 text-[10px] whitespace-nowrap text-white md:hidden">
                      Recibido en tienda
                    </span>
                  ) : null}
                </>
              ) : null}
            </span>
          ) : null}
        </div>

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

        <h3 className="mt-[12px] ml-2 truncate text-[13px] leading-[1.25] font-light tracking-[-0.01em] text-[#1F1F1F]">
          {product.name}
        </h3>
        <p className="mt-[12px] ml-2 text-[15px] leading-none tracking-[-0.03em] text-[#151515]">
          {currencyFormatter.format(secondary.value)}
        </p>
        <p className="mt-[12px] ml-2 text-[12px] leading-[1.4] text-[#777777]">
          Ganancia: {currencyFormatter.format(product.earning)}
        </p>

        <span
          className="mt-[12px] w-full rounded-full py-[7px] text-center text-[12px] font-medium"
          style={getStatusStyle(pillStatus)}
        >
          {pillStatus}
        </span>
      </article>
      {isShippingModalOpen ? (
        <ShippingOptionsModal onClose={() => setIsShippingModalOpen(false)} />
      ) : null}
    </>
  );
}
