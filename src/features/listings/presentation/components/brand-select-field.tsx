'use client';

import type { Brand } from '@/src/features/listings/domain/brand-repository';
import { TagIcon } from '@/src/shared/ui/icons';
import { SheetSelectField } from '@/src/shared/ui/sheet-select-field';
import { useBrands } from '../hooks/use-brands';

interface BrandSelectFieldProps {
  value: number | null;
  onSelect: (brand: Brand) => void;
}

export function BrandSelectField({ value, onSelect }: BrandSelectFieldProps) {
  const { data: brands, isPending, isError } = useBrands();

  const selected = brands?.find((brand) => brand.id === value);

  return (
    <SheetSelectField
      fieldLabel="Marca"
      placeholder="Marca *"
      selectedLabel={selected?.name}
      sheetTitle="Información del producto"
      headerIcon={<TagIcon className="size-6 text-neutral-900" />}
      headerLabel="Marca *"
    >
      {(close) => (
        <>
          {isPending ? <li className="py-4 text-base text-neutral-400">Cargando marcas…</li> : null}
          {isError ? (
            <li className="py-4 text-base text-neutral-500">No se pudieron cargar las marcas.</li>
          ) : null}
          {brands?.map((brand) => (
            <li key={brand.id} className="border-b border-neutral-100 last:border-b-0">
              <button
                type="button"
                onClick={() => {
                  onSelect(brand);
                  close();
                }}
                className={`w-full py-5 text-left text-base ${
                  brand.id === value ? 'text-brand font-medium' : 'text-neutral-900'
                }`}
              >
                {brand.name}
              </button>
            </li>
          ))}
        </>
      )}
    </SheetSelectField>
  );
}
