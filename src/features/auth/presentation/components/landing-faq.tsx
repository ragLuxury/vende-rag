'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { FAQ_PREVIEW } from './landing-content';

export function LandingFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="preguntas-frecuentes" className="pt-1 pb-10">
      <div className="mx-auto w-full max-w-3xl px-8">
        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          Preguntas <span className="font-normal italic">frecuentes</span>
        </h2>

        <ul className="mt-12 flex flex-col gap-3">
          {FAQ_PREVIEW.map((item) => {
            const open = openId === item.id;
            const panelId = `landing-faq-${item.id}`;

            return (
              <li key={item.id} className="rounded-2xl border border-neutral-200">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-neutral-900">{item.question}</span>
                  <Icon
                    icon="ion:chevron-down-outline"
                    className={`size-4 shrink-0 text-neutral-500 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {open ? (
                  <p id={panelId} className="px-6 pb-4 text-sm leading-relaxed text-neutral-500">
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
