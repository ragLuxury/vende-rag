'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROCESS_TABS } from './landing-content';

export function LandingProcessTabs() {
  const [activeId, setActiveId] = useState(PROCESS_TABS[0]?.id ?? '');
  const activeTab = PROCESS_TABS.find((tab) => tab.id === activeId) ?? PROCESS_TABS[0];

  return (
    <section id="nuestro-proceso" className="py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Lo que necesitas saber sobre nuestro <span className="italic">proceso</span>
        </h2>

        <div className="mt-12 flex justify-center gap-10 border-b border-neutral-200">
          {PROCESS_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className={`cursor-pointer border-b-2 pb-4 text-xs font-semibold tracking-wide uppercase transition-colors ${
                tab.id === activeId
                  ? 'border-brand text-brand'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab.step}
            </button>
          ))}
        </div>

        {activeTab ? (
          <div className="mt-12 grid grid-cols-2 gap-16">
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.2em] uppercase">
                {activeTab.title}
              </p>
              <h3 className="font-editors mt-4 text-3xl text-neutral-900">{activeTab.heading}</h3>
              <p className="mt-6 leading-relaxed text-neutral-500">{activeTab.body}</p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-50">
              {PROCESS_TABS.map((tab) => (
                <Image
                  key={tab.id}
                  src={tab.image}
                  alt={`Proceso de ${tab.title}`}
                  fill
                  aria-hidden={tab.id !== activeTab.id}
                  className={`object-cover transition-opacity duration-300 ${
                    tab.id === activeTab.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
