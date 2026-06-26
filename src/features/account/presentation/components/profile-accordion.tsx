'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface ProfileAccordionProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export function ProfileAccordion({ icon, label, children }: ProfileAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-neutral-200 px-5 py-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-4"
      >
        <span className="shrink-0 text-neutral-900">{icon}</span>
        <span className="font-editors flex-1 text-left text-xl text-neutral-900">{label}</span>
        <Icon
          icon={open ? 'ion:chevron-up-outline' : 'ion:chevron-down-outline'}
          className="size-5 shrink-0 text-neutral-500"
        />
      </button>

      {open ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
