import Link from 'next/link';
import { Icon } from '@iconify/react';
import { SHIPPING_OPTIONS } from './landing-content';

export function LandingShipping() {
  return (
    <section id="formas-de-envio" className="py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          Elige cómo <span className="font-normal italic">enviar</span>
        </h2>

        <div className="mx-auto mt-12 grid max-w-[880px] grid-cols-3 gap-6">
          {SHIPPING_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="flex flex-col items-center rounded-3xl bg-neutral-50 p-6 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-white">
                <Icon icon={option.icon} className="text-brand size-6" />
              </span>
              <h3 className="text-md mt-6 font-semibold text-neutral-900">{option.title}</h3>
              <p className="mt-3 mb-6 text-xs leading-relaxed text-neutral-500">
                {option.description}
              </p>
              <Link
                href={option.href}
                className="bg-brand mt-auto rounded-[10px] px-6 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                {option.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
