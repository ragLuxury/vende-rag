'use client';

import { useState, type ReactNode } from 'react';

import { BottomSheet } from './bottom-sheet';
import { ChevronDownIcon } from './icons';

interface SheetSelectFieldProps {
  fieldLabel: string;
  placeholder: string;
  selectedLabel: string | undefined;
  sheetTitle: string;
  headerIcon: ReactNode;
  headerLabel: string;
  children: (close: () => void) => ReactNode;
}

export function SheetSelectField({
  fieldLabel,
  placeholder,
  selectedLabel,
  sheetTitle,
  headerIcon,
  headerLabel,
  children,
}: SheetSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={fieldLabel}
        className={`focus:border-brand flex w-full items-center justify-between gap-2 rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-left text-base focus:outline-none ${
          selectedLabel ? 'text-neutral-900' : 'text-neutral-400'
        }`}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <ChevronDownIcon className="size-5 shrink-0 text-neutral-500" />
      </button>

      <BottomSheet open={open} label={sheetTitle} onClose={close}>
        <div className="flex items-center gap-3 px-6 pt-6 pb-2">
          {headerIcon}
          <span className="text-lg font-semibold text-neutral-900">{headerLabel}</span>
        </div>

        <ul className="px-6">{children(close)}</ul>
      </BottomSheet>
    </>
  );
}
