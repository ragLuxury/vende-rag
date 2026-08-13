'use client';

import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import Link from 'next/link';
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
        className="relative z-10 mt-[50px] max-h-[90vh] w-full max-w-[518px] overflow-y-auto rounded-3xl bg-white p-5 shadow-xl"
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

        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-violet-50">
          <Icon icon="ion:rocket-outline" className="size-6 text-violet-500" />
        </div>

        <h2 className="mt-3 text-center text-3xl font-bold text-neutral-900">¿Qué sigue?</h2>

        <p className="mt-2 text-center text-xs leading-relaxed text-neutral-500">
          {intro.title}
          <br />
          {intro.description}
        </p>

        <div className="mt-5 rounded-2xl bg-violet-50 p-4 mx-10">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <Icon icon={dropOff.icon} className="size-5 text-violet-600" />
            </span>
            <h3 className="text-base font-semibold text-neutral-900">{dropOff.title}</h3>
          </div>

          {dropOff.badge ? (
            <span className="mt-2 ml-14 inline-block rounded-full bg-violet-100 px-3 py-0.5 text-xs font-semibold tracking-wide text-violet-700 uppercase">
              {dropOff.badge}
            </span>
          ) : null}

          <div className="mt-2 ml-14 space-y-1.5 text-sm text-neutral-600">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dropOff.description)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 underline underline-offset-2"
            >
              <Icon icon="ion:location-outline" className="mt-0.5 size-4 shrink-0 text-violet-500" />
              {dropOff.description}
            </a>
            {dropOff.weekdayHours ? (
              <p className="flex items-center gap-2">
                <Icon icon="ion:calendar-outline" className="size-4 shrink-0 text-violet-500" />
                {dropOff.weekdayHours}
              </p>
            ) : null}
            {dropOff.saturdayHours ? (
              <p className="flex items-center gap-2">
                <Icon icon="ion:time-outline" className="size-4 shrink-0 text-violet-500" />
                {dropOff.saturdayHours}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative my-4 mx-10 flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
          <span className="relative flex size-6 items-center justify-center rounded-full bg-white text-xs text-neutral-400">
            ó
          </span>
        </div>

        <div className="rounded-2xl bg-emerald-50 mb-4 p-4 mx-10">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <Icon icon={shipping.icon} className="size-5 text-emerald-600" />
            </span>
            <h3 className="text-base font-semibold text-neutral-900">{shipping.title}</h3>
          </div>
          <Link
            href={shipping.href}
            onClick={onClose}
            className="mt-2 ml-14 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 underline underline-offset-2"
          >
            {shipping.description}
            <Icon icon="ion:arrow-forward-outline" className="size-4" />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
