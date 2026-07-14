import Image from 'next/image';
import { VALUATION_CARDS, VALUATION_INTRO } from './landing-content';

export function LandingValuation() {
  return (
    <section id="como-valuamos" className="border-t border-neutral-100 bg-neutral-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Cómo <span className="italic">valuamos</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-500">{VALUATION_INTRO}</p>

        <div className="mt-12 grid grid-cols-3 gap-8">
          {VALUATION_CARDS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-3xl border border-neutral-200 bg-white p-8 text-center"
            >
              <Image
                src={item.icon}
                alt=""
                width={72}
                height={72}
                className="h-18 w-18 object-contain"
              />
              <h3 className="mt-6 text-lg font-semibold text-neutral-900">{item.title}</h3>
              <a
                href="#nuestro-proceso"
                className="text-brand mt-4 text-sm font-medium underline underline-offset-4"
              >
                Saber más...
              </a>
              <p className="sr-only">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
