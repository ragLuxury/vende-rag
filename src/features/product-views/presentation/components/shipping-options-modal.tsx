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

        <h2 className="text-2xl font-bold text-neutral-900">¿Qué sigue?</h2>
        <p className="mt-2 text-center text-xs leading-relaxed text-neutral-500">
          {intro.title}
          <br />
          {intro.description}
        </p>

        <div className="mt-6 rounded-2xl bg-violet-50 p-4 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-base leading-none">
              📍
            </span>
            <h3 className="text-sm font-bold text-neutral-900">{dropOff.title}</h3>
          </div>

          {dropOff.badge ? (
            <p className="mt-1 text-xs text-neutral-500">{dropOff.badge}</p>
          ) : null}

          <div className="mt-2 flex items-center gap-2">
            <span className="shrink-0 leading-none">📌</span>
            <a
              href="https://www.google.com/maps/place/RAG+LUXURY+RESALE/@20.7057945,-103.4039105,17.22z/data=!4m6!3m5!1s0x8428afd7379f72b1:0x7e079f278e05ec38!8m2!3d20.7057903!4d-103.4026447!16s%2Fg%2F11ymb4fg2n?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver ubicación en Google Maps"
              className="text-xs leading-relaxed text-neutral-900 underline underline-offset-2"
            >
              {dropOff.description}
            </a>
          </div>

          {dropOff.weekdayHours || dropOff.saturdayHours ? (
            <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
              <span className="shrink-0 leading-none">📅</span>
              <div>
                {dropOff.weekdayHours ? <p>{dropOff.weekdayHours}</p> : null}
                {dropOff.saturdayHours ? <p>{dropOff.saturdayHours}</p> : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
          <span className="relative bg-white px-2 text-xs text-neutral-400">ó</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base leading-none">
              📦
            </span>
            <h3 className="text-sm font-bold text-neutral-900">{shipping.title}</h3>
          </div>
          <a
            href={shipping.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700 underline underline-offset-2"
          >
            {shipping.description}
            <Icon icon="ion:arrow-forward-outline" className="size-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
