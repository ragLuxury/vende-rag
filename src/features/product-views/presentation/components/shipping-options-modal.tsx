'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { SHIPPING_OPTIONS } from '@/src/shared/content/shipping-options';

interface ShippingOptionsModalProps {
  onClose: () => void;
}

export function ShippingOptionsModal({ onClose }: ShippingOptionsModalProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Elige cómo enviar"
        className="mt-[50px] relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-xl"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <Icon icon="ion:close-outline" className="size-6" />
        </button>

        <h2 className="font-cormorant text-center text-2xl font-semibold text-neutral-900">
          Elige cómo <span className="font-normal italic">enviar</span>
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {SHIPPING_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="flex items-center gap-4 rounded-2xl bg-neutral-50 p-4"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
                <Icon icon={option.icon} className="text-brand size-5" />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-neutral-900">{option.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {option.description}
                </p>
              </div>
              <Link
                href={option.href}
                className="bg-brand shrink-0 rounded-[10px] px-4 py-2.5 text-[10px] font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                {option.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 text-xs text-neutral-400">
          <Icon icon="ion:information-circle-outline" className="mt-0.5 size-4 shrink-0" />
          Puedes cambiar la opción de envío en cualquier momento.
        </p>
      </div>
    </div>,
    document.body,
  );
}
