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
        className="relative z-10 mt-[50px] max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-xl"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 text-neutral-500 transition-colors hover:cursor-pointer hover:text-neutral-900"
        >
          <Icon icon="ion:close-outline" className="size-6" />
        </button>

        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          ¿Qué sigue?
        </h2>

        <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
          {intro.title}
          <br />
          {intro.description}
        </p>

        <div className="mt-6 text-center">
          <h3 className="text-base font-semibold text-neutral-900">{dropOff.title}</h3>
          {dropOff.badge ? (
            <p className="mt-1 text-xs text-neutral-500">{dropOff.badge}</p>
          ) : null}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dropOff.description)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-xs leading-relaxed text-neutral-700 underline underline-offset-2"
          >
            {dropOff.description}
          </a>
          {dropOff.weekdayHours ? (
            <p className="mt-1 text-xs text-neutral-500">{dropOff.weekdayHours}</p>
          ) : null}
          {dropOff.saturdayHours ? (
            <p className="text-xs text-neutral-500">{dropOff.saturdayHours}</p>
          ) : null}
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-base font-semibold text-neutral-900">{shipping.title}</h3>
          <a
            href={shipping.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-neutral-700 underline underline-offset-2"
          >
            {shipping.description}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
