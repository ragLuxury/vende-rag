'use client';

import { useRef, useState } from 'react';
import type { UIEvent } from 'react';

import type { ProcessStep } from '../content';

interface ProcessCarouselProps {
  steps: readonly ProcessStep[];
}

export function ProcessCarousel({ steps }: ProcessCarouselProps) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 px-6 py-7">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step) => (
          <article
            key={step.id}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
          >
            <p className="text-lg text-neutral-800">
              {step.step}.- {step.title}
            </p>
            <h3 className="mt-3 text-base font-semibold text-neutral-900">{step.heading}</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">{step.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <span
            key={step.id}
            aria-hidden="true"
            className={`size-2.5 rounded-full transition-colors ${
              index === active ? 'bg-brand' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
