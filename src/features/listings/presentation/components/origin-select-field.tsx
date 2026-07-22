'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const ORIGIN_OPTIONS = [
  { value: '1', label: 'Producto comprado en tienda o en una pagina web oficial' },
  { value: '2', label: 'Producto comprado en una pagina de preloved' },
  { value: '3', label: 'Desconozco el origen del producto(ejemplo;fue un regalo)' },
] as const;

interface OriginSelectFieldProps {
  value: string;
  onSelect: (value: string) => void;
}

export function OriginSelectField({ value, onSelect }: OriginSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = ORIGIN_OPTIONS.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function handleSelect(optionValue: string) {
    onSelect(optionValue);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Origen del producto"
        aria-expanded={open}
        className={`focus:border-brand flex w-full items-center justify-between gap-2 rounded-2xl border border-neutral-300 bg-transparent px-3 py-2.5 text-left text-sm focus:outline-none ${
          selected ? 'text-neutral-900' : 'text-neutral-400'
        }`}
      >
        <span>{selected?.label ?? 'Origen del producto *'}</span>
        <Icon icon="ion:chevron-down-outline" className="size-5 shrink-0 text-neutral-500" />
      </button>

      {open ? (
        <div className="absolute top-full z-10 mt-2 w-full rounded-2xl border border-neutral-200 bg-white py-2 shadow-lg">
          {ORIGIN_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`block w-full px-4 py-2.5 text-left text-base transition-colors hover:bg-neutral-50 ${
                option.value === value ? 'text-brand font-medium' : 'text-neutral-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
