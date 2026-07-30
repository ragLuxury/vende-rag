'use client';

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
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="fixed inset-0 bg-neutral-900/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Elige cómo enviar"
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

        <h2 className="font-cormorant text-center text-2xl font-semibold text-neutral-900">
          Elige cómo <span className="font-normal italic">enviar</span>
        </h2>

        <div className="mt-4 flex flex-col gap-4">
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
            </div>
          ))}
        </div>



        <div className='flex justify-center'>
          <button
            type="button"
            className="bg-brand mt-6 w-[150px] rounded-[10px] py-3 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Contactar
          </button>
        </div>
        
      </div>
    </div>,
    document.body,
  );
}
