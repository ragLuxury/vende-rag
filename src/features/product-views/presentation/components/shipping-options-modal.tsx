'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {
  SHIPPING_MODAL_DISMISSED_KEY,
  SHIPPING_OPTIONS,
} from '@/src/shared/content/shipping-options';

interface ShippingOptionsModalProps {
  onClose: () => void;
}

export function ShippingOptionsModal({ onClose }: ShippingOptionsModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [intro, dropOff, shipping] = SHIPPING_OPTIONS;

  if (typeof document === 'undefined') return null;

  function handleClose() {
    if (dontShowAgain) {
      localStorage.setItem(SHIPPING_MODAL_DISMISSED_KEY, 'true');
    }
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={(event) => {
          event.stopPropagation();
          handleClose();
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
            handleClose();
          }}
          className="absolute top-6 right-6 text-neutral-500 transition-colors hover:cursor-pointer hover:text-neutral-900"
        >
          <Icon icon="ion:close-outline" className="size-6" />
        </button>

        <h2 className="font-cormorant text-center text-2xl font-semibold text-neutral-900">
          ¿Qué sigue?
        </h2>

        <p className="mt-4 text-center text-sm leading-relaxed text-neutral-500">
          {intro.title}
          <br />
          {intro.description}
        </p>

        <div className="mt-8 text-center">
          <h3 className="text-base font-semibold text-neutral-900">{dropOff.title}</h3>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-neutral-500">
            {dropOff.description}
          </p>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-base font-semibold text-neutral-900">{shipping.title}</h3>
          <Link
            href={shipping.href}
            onClick={handleClose}
            className="mt-2 inline-block text-sm text-neutral-700 underline underline-offset-2"
          >
            {shipping.description}
          </Link>
        </div>

        <label className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => setDontShowAgain(event.target.checked)}
            className="accent-neutral-900 size-3.5 rounded border-neutral-300"
          />
          No volver a mostrar este mensaje
        </label>
      </div>
    </div>,
    document.body,
  );
}
