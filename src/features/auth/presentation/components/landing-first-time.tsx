import Link from 'next/link';
import { FIRST_TIME_CARDS } from './landing-content';

export function LandingFirstTime() {
  return (
    <section className="bg-[#ededed] py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Mi Primera <span className="italic">vez en RAG</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-500">
          Vende piezas que ya no usas y gana dinero rápido. Estamos para ayudarte en cada paso.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-8">
          {FIRST_TIME_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-8 text-center"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">{card.description}</p>
              <Link
                href={card.href}
                className="bg-brand mt-6 rounded-[10px] px-6 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                {card.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
