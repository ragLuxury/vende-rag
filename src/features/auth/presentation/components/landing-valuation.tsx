'use client';

import Image from 'next/image';
import { useState } from 'react';
import { VALUATION_CARDS, VALUATION_INTRO } from './landing-content';

export function LandingValuation() {
  const [flippedTitles, setFlippedTitles] = useState<ReadonlySet<string>>(new Set());

  function toggleCard(title: string) {
    setFlippedTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }

  return (
    <section id="como-valuamos" className="border-t border-neutral-100 bg-neutral-100 py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Cómo <span className="italic">valuamos</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-500">{VALUATION_INTRO}</p>

        <div className="mt-12 grid grid-cols-3 gap-8">
          {VALUATION_CARDS.map((item) => {
            const isFlipped = flippedTitles.has(item.title);

            return (
              <div key={item.title} className="aspect-square [perspective:1000px]">
                <button
                  type="button"
                  onClick={() => toggleCard(item.title)}
                  aria-label={
                    isFlipped
                      ? `Ocultar detalles de ${item.title}`
                      : `Ver detalles de ${item.title}`
                  }
                  className={`relative block size-full cursor-pointer border-0 bg-transparent p-0 text-left transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-8 text-center [backface-visibility:hidden]">
                    <Image
                      src={item.icon}
                      alt=""
                      width={144}
                      height={144}
                      className="size-36 max-w-none object-contain"
                    />
                    <h3 className="mt-6 text-lg font-semibold text-neutral-900">{item.title}</h3>
                    <span className="text-brand mt-4 text-sm font-medium">Saber más...</span>
                  </div>

                  <div className="scrollbar-hide absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center overflow-y-auto rounded-xl border border-neutral-200 bg-white px-4 py-8 text-center [backface-visibility:hidden]">
                    <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                    {item.detailIntro ? (
                      <p className="mt-3 text-sm text-neutral-500">{item.detailIntro}</p>
                    ) : null}
                    {item.detailBullets ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-left text-sm text-neutral-500">
                        {item.detailBullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {item.detailBody ? (
                      <p className="mt-3 text-sm text-neutral-500">{item.detailBody}</p>
                    ) : null}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
