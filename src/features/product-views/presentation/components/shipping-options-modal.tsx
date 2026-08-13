'use client';

import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { SHIPPING_OPTIONS } from '@/src/shared/content/shipping-options';

interface ShippingOptionsModalProps {
  onClose: () => void;
}

export function ShippingOptionsModal({ onClose }: ShippingOptionsModalProps) {
  const [intro, dropOff, shipping] = SHIPPING_OPTIONS;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="fixed inset-0 bg-neutral-900/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="¿Qué sigue?"
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 mt-[50px]  max-h-[90vh] w-[60%] max-w-lg overflow-y-auto rounded-3xl bg-white p-8 text-center shadow-xl"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:cursor-pointer hover:text-neutral-900"
        >
          <Icon icon="ion:close-outline" className="size-5" />
        </button>

        <div className="mt-2 text-center">
          <h2 className="text-[20px] font-bold text-neutral-900">{intro.title}</h2>
          <p className="font-semibold mt-1 text-lg text-neutral-900 italic">¿Qué sigue?</p>
          <p className="mt-2 text-xs text-neutral-500">{intro.description}</p>
        </div>

        <hr className="mt-6 border-t border-neutral-200" />

        <div className="mt-6 text-center">
          <h3 className="text-sm font-bold text-neutral-900">{dropOff.title}</h3>
          {dropOff.badge ? (
            <p className="mt-1 text-xs text-neutral-500">{dropOff.badge}</p>
          ) : null}
          <div className="mt-2 flex w-full justify-center">
            <p className="w-70 text-center text-xs leading-relaxed text-neutral-900">
              {dropOff.description}
            </p>
          </div>

          {dropOff.weekdayHours ? (
            <p className="mt-2 text-xs text-neutral-500">{dropOff.weekdayHours}</p>
          ) : null}
          {dropOff.saturdayHours ? (
            <p className="text-xs text-neutral-500">{dropOff.saturdayHours}</p>
          ) : null}
          <div className="mt-3 flex items-center justify-center gap-3">
            <a
              href="https://www.google.com/maps/place/RAG+LUXURY+RESALE/@20.7057945,-103.4039105,17.22z/data=!4m6!3m5!1s0x8428afd7379f72b1:0x7e079f278e05ec38!8m2!3d20.7057903!4d-103.4026447!16s%2Fg%2F11ymb4fg2n?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver ubicación en Google Maps"
              className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Icon icon="simple-icons:googlemaps" className="size-4" />
            </a>
            <a
              href="https://waze.com/ul?ll=20.7057903,-103.4026447&navigate=yes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver ubicación en Waze"
              className="inline-flex size-8 items-center justify-center rounded-full bg-sky-500 text-white"
            >
              <Icon icon="simple-icons:waze" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-sm font-bold text-neutral-900">{shipping.title}</h3>
          <a
            href={shipping.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand hover:bg-brand/90 mt-3 inline-block rounded-full px-5 py-2 text-sm font-medium text-white transition-colors"
          >
            {shipping.description}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
