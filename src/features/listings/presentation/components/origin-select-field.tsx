'use client';

import { Icon } from '@iconify/react';

import { SheetSelectField } from '@/src/shared/ui/sheet-select-field';

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
  const selected = ORIGIN_OPTIONS.find((option) => option.value === value);

  return (
    <SheetSelectField
      fieldLabel="Origen del producto"
      placeholder="Origen del producto *"
      selectedLabel={selected?.label}
      sheetTitle="Información del producto"
      headerIcon={<Icon icon="ion:location-outline" className="size-6 text-neutral-900" />}
      headerLabel="Origen del producto *"
    >
      {(close) =>
        ORIGIN_OPTIONS.map((option) => (
          <li key={option.value} className="border-b border-neutral-100 last:border-b-0">
            <button
              type="button"
              onClick={() => {
                onSelect(option.value);
                close();
              }}
              className={`w-full py-5 text-left text-base ${
                option.value === value ? 'text-brand font-medium' : 'text-neutral-900'
              }`}
            >
              {option.label}
            </button>
          </li>
        ))
      }
    </SheetSelectField>
  );
}
