import { Icon } from '@iconify/react';
import { WHY_CONSIGN } from './landing-content';

export function LandingWhyConsign() {
  return (
    <section id="por-que-elegirnos" className="bg-neutral-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Por qué consignar <span className="italic">con nosotros</span>
        </h2>

        <div className="mt-12 grid grid-cols-5 gap-6">
          {WHY_CONSIGN.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <span className="bg-brand/10 flex size-16 items-center justify-center rounded-full">
                <Icon icon={item.icon} className="text-brand size-7" />
              </span>
              <h3 className="mt-5 text-sm font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
