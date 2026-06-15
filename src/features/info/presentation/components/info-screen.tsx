import Image from 'next/image';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { PROCESS_STEPS, VALUATION_INTRO, VALUATION_ITEMS, WELCOME } from '../content';
import { ProcessCarousel } from './process-carousel';
import { ValuationAccordion } from './valuation-accordion';

export function InfoScreen() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <div className="flex-1 px-6 pt-6 pb-28">
        <p className="text-center text-lg text-neutral-800">Información</p>

        <div className="-mx-6 mt-6">
          <Image
            src="/images/header-bolsas.jpg"
            alt="Bolsas de lujo en consignación con RAG"
            width={1626}
            height={1172}
            priority
            className="h-auto w-full"
          />
        </div>

        <section className="mt-8">
          <h1 className="text-base font-semibold text-neutral-900">{WELCOME.title}</h1>
          <p className="mt-3 text-xs leading-relaxed text-neutral-700">{WELCOME.body}</p>
        </section>

        <hr className="my-8 border-neutral-200" />

        <section>
          <h2 className="text-base font-semibold text-neutral-900">Cómo valuamos</h2>
          <p className="mt-3 text-xs leading-relaxed text-neutral-700">{VALUATION_INTRO}</p>

          <div className="mt-6">
            <ValuationAccordion items={VALUATION_ITEMS} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-base font-semibold text-neutral-900">Conoce nuestro proceso</h2>
          <div className="mt-6">
            <ProcessCarousel steps={PROCESS_STEPS} />
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
