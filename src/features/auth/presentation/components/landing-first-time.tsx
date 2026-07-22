import Link from 'next/link';
import { FIRST_TIME_CARDS } from './landing-content';

export function LandingFirstTime() {
  return (
    <section className="bg-[#ededed] py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          Mi Primera <span className="font-normal italic">vez en RAG</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-neutral-800">
          Eleva tu estilo con nuestra exclusiva selección de productos. Desde clásicos icónicos
          hasta piezas de tendencia, encuentra el accesorio perfecto para cada ocasión. Además, si
          deseas vender artículos de manera rápida y justa, ¡estás en el lugar indicado!
        </p>

        <div className="mx-auto mt-12 grid max-w-[880px] grid-cols-3 gap-6">
          {FIRST_TIME_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-6 text-center"
            >
              <h3 className="text-md font-semibold text-neutral-900">{card.title}</h3>
              <p className="mt-3 mb-6 text-xs leading-relaxed text-neutral-500">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="bg-brand mt-auto rounded-[10px] px-6 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
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
