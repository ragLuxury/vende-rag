'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import { useBanks } from '../hooks/use-banks';

interface BankSelectFieldProps {
  value: string;
  onSelect: (bankName: string) => void;
}

export function BankSelectField({ value, onSelect }: BankSelectFieldProps) {
  const { data: banks, isPending, isError } = useBanks();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleSelect(bankName: string) {
    onSelect(bankName);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Banco"
        aria-expanded={open}
        className={`focus:border-brand flex w-full items-center justify-between gap-2 rounded-2xl border border-neutral-300 bg-transparent px-4 py-[11px] text-left text-[13px] focus:outline-none ${
          value ? 'text-neutral-900' : 'text-neutral-400'
        }`}
      >
        <span>{value || 'Selecciona tu banco'}</span>
        <Icon icon="ion:chevron-down-outline" className="size-5 shrink-0 text-neutral-500" />
      </button>

      {open ? (
        <div className="absolute top-full z-10 mt-2 w-full rounded-2xl border border-neutral-200 bg-white py-2 shadow-lg">
          {isPending ? <p className="px-4 py-2.5 text-[13px] text-neutral-400">Cargando bancos…</p> : null}
          {isError ? (
            <p className="px-4 py-2.5 text-[13px] text-neutral-500">No se pudieron cargar los bancos.</p>
          ) : null}
          {banks?.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => handleSelect(bank.name)}
              className={`block w-full px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-neutral-50 ${
                bank.name === value ? 'text-brand font-medium' : 'text-neutral-900'
              }`}
            >
              {bank.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
