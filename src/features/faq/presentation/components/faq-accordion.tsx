'use client';

import { useState } from 'react';

import { ChevronDownIcon } from '@/src/shared/ui/icons';
import type { FaqItem } from '@/src/features/faq/domain/faq-repository';

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;

        return (
          <li key={item.id} className="rounded-2xl border border-neutral-200">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-start gap-4 px-4 py-4 text-left"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm text-neutral-500">
                {index + 1}
              </span>
              <span className="flex-1 text-base font-medium text-neutral-900">{item.question}</span>
              <ChevronDownIcon
                className={`mt-1 size-4 shrink-0 text-neutral-500 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open ? (
              <div
                id={panelId}
                className="[&_a]:text-brand px-4 pb-4 text-sm leading-relaxed text-neutral-500 [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0"
                // FAQ answers are trusted admin-authored HTML served by the RAG backend.
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
