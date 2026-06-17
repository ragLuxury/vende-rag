'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import type { ValuationItem } from '../content';

interface ValuationAccordionProps {
  items: readonly ValuationItem[];
}

export function ValuationAccordion({ items }: ValuationAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `valuation-panel-${item.id}`;

        return (
          <div key={item.id} className="rounded-2xl border border-neutral-200">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <Image
                src={item.icon}
                alt=""
                width={88}
                height={88}
                className="size-9 shrink-0 object-contain"
              />
              <span className="flex-1 text-base text-neutral-800">{item.title}</span>
              <Icon
                icon="ion:chevron-down-outline"
                className={`size-4 shrink-0 text-neutral-500 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open ? (
              <div id={panelId} className="px-4 pb-4 text-xs leading-relaxed text-neutral-700">
                <p>{item.body}</p>
                {item.bullets ? (
                  <ul className="mt-1 list-disc pl-5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
