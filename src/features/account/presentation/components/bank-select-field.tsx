'use client';

import { Icon } from '@iconify/react';

import { SheetSelectField } from '@/src/shared/ui/sheet-select-field';
import { useBanks } from '../hooks/use-banks';

interface BankSelectFieldProps {
  value: string;
  onSelect: (bankName: string) => void;
}

export function BankSelectField({ value, onSelect }: BankSelectFieldProps) {
  const { data: banks, isPending, isError } = useBanks();

  return (
    <SheetSelectField
      fieldLabel="Banco"
      placeholder="Selecciona tu banco"
      selectedLabel={value || undefined}
      sheetTitle="Método de pago"
      headerIcon={<Icon icon="ion:business-outline" className="size-6 text-neutral-900" />}
      headerLabel="Banco"
    >
      {(close) => (
        <>
          {isPending ? <li className="py-4 text-base text-neutral-400">Cargando bancos…</li> : null}
          {isError ? (
            <li className="py-4 text-base text-neutral-500">No se pudieron cargar los bancos.</li>
          ) : null}
          {banks?.map((bank) => (
            <li key={bank.id} className="border-b border-neutral-100 last:border-b-0">
              <button
                type="button"
                onClick={() => {
                  onSelect(bank.name);
                  close();
                }}
                className={`w-full py-5 text-left text-base ${
                  bank.name === value ? 'text-brand font-medium' : 'text-neutral-900'
                }`}
              >
                {bank.name}
              </button>
            </li>
          ))}
        </>
      )}
    </SheetSelectField>
  );
}
