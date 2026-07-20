import Image from 'next/image';
import { WHY_CONSIGN } from './landing-content';

export function LandingWhyConsign() {
  return (
    <section id="por-que-elegirnos" className="bg-neutral-100 py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Por qué consignar <span className="italic">con nosotros</span>
        </h2>

        <div className="mt-12 grid grid-cols-5 gap-6">
          {WHY_CONSIGN.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <Image
                src={item.image}
                alt={item.title}
                width={96}
                height={96}
                className="size-24 max-w-none object-contain"
              />
              <h3 className="mt-5 text-sm font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
