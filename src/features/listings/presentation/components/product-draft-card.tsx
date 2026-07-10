'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { BrandSelectField } from './brand-select-field';
import { OriginSelectField } from './origin-select-field';
import { MIN_PHOTOS, PhotoUploader } from './photo-uploader';
import { SellerSelectField } from './seller-select-field';
import { useCommission } from '../hooks/use-commission';

const PRICE_DEBOUNCE_MS = 400;

export const PRELOVED_ORIGIN = '2';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export interface ProductDraft {
  id: string;
  sellerId: number | null;
  photos: readonly File[];
  brandId: number | null;
  brandName: string;
  description: string;
  price: string;
  origin: string;
  pageName: string;
  details: string;
}

export function createEmptyDraft(): ProductDraft {
  return {
    id: crypto.randomUUID(),
    sellerId: null,
    photos: [],
    brandId: null,
    brandName: '',
    description: '',
    price: '',
    origin: '',
    pageName: '',
    details: '',
  };
}

export function isDraftValid(draft: ProductDraft, requiresSeller: boolean): boolean {
  const isPreloved = draft.origin === PRELOVED_ORIGIN;
  return (
    draft.photos.length >= MIN_PHOTOS &&
    draft.brandId !== null &&
    draft.origin !== '' &&
    Number(draft.price) > 0 &&
    (!isPreloved || draft.pageName.trim() !== '') &&
    (!requiresSeller || draft.sellerId !== null)
  );
}

interface ProductDraftCardProps {
  index: number;
  draft: ProductDraft;
  userId: number | null;
  canDelegate: boolean;
  open: boolean;
  canRemove: boolean;
  onToggle: () => void;
  onChange: (draft: ProductDraft) => void;
  onRemove: () => void;
}

export function ProductDraftCard({
  index,
  draft,
  userId,
  canDelegate,
  open,
  canRemove,
  onToggle,
  onChange,
  onRemove,
}: ProductDraftCardProps) {
  const [debouncedPrice, setDebouncedPrice] = useState(draft.price);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedPrice(draft.price), PRICE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [draft.price]);

  const clientId = canDelegate ? draft.sellerId : userId;

  const { data: commission, isFetching: isCommissionLoading } = useCommission(
    Number(debouncedPrice),
    clientId,
  );

  const isPreloved = draft.origin === PRELOVED_ORIGIN;

  function update(partial: Partial<ProductDraft>) {
    onChange({ ...draft, ...partial });
  }

  const summary = [
    draft.brandName,
    Number(draft.price) > 0 ? currencyFormatter.format(Number(draft.price)) : '',
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="rounded-2xl border border-neutral-200">
      <div className="flex items-center gap-2 px-5 py-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span className="font-editors text-lg text-neutral-900">Producto {index + 1}</span>
          {!open && summary ? (
            <span className="truncate text-sm text-neutral-400">{summary}</span>
          ) : null}
          <Icon
            icon={open ? 'ion:chevron-up-outline' : 'ion:chevron-down-outline'}
            className="ml-auto size-5 shrink-0 text-neutral-500"
          />
        </button>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Eliminar producto ${index + 1}`}
            className="text-red-500"
          >
            <Icon icon="ion:trash-outline" className="size-5" />
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="border-t border-neutral-100 px-5 pt-5 pb-6">
          {canDelegate ? (
            <div className="mb-6">
              <label className="mb-3 block text-base text-neutral-800">Cliente</label>
              <SellerSelectField
                value={draft.sellerId}
                onSelect={(seller) => update({ sellerId: seller.id })}
              />
            </div>
          ) : null}

          <PhotoUploader photos={draft.photos} onChange={(photos) => update({ photos })} />

          <div className="mt-6 flex flex-col gap-4">
            <BrandSelectField
              value={draft.brandId}
              onSelect={(brand) => update({ brandId: brand.id, brandName: brand.name })}
            />
            <input
              value={draft.description}
              onChange={(event) => update({ description: event.target.value })}
              aria-label="Descripción"
              placeholder="Descripción"
              className={FIELD_CLASS}
            />
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 text-base text-neutral-800">
              ¿En cuanto te gustaría venderlo?
              <Icon icon="ion:information-circle-outline" className="size-5 text-neutral-400" />
            </label>
            <input
              value={draft.price}
              onChange={(event) => update({ price: event.target.value.replace(/[^\d]/g, '') })}
              inputMode="numeric"
              aria-label="Precio"
              placeholder="$0"
              className={`${FIELD_CLASS} mt-3`}
            />
          </div>

          <div className="mt-6">
            <p className="text-base text-neutral-800">Esta sería tu ganancia</p>
            <input
              disabled
              aria-label="Ganancia estimada"
              value={
                isCommissionLoading
                  ? 'Calculando...'
                  : commission
                    ? currencyFormatter.format(commission.sellerNet)
                    : ''
              }
              placeholder="Cálculo automático"
              className="mt-3 w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3.5 text-base text-neutral-500 placeholder:text-neutral-400"
            />
          </div>

          <div className="mt-6">
            <OriginSelectField
              value={draft.origin}
              onSelect={(value) =>
                update({ origin: value, ...(value !== PRELOVED_ORIGIN ? { pageName: '' } : {}) })
              }
            />
          </div>

          {isPreloved ? (
            <div className="mt-6">
              <label className="text-base text-neutral-800">Nombre de la página.</label>
              <input
                value={draft.pageName}
                onChange={(event) => update({ pageName: event.target.value })}
                placeholder="Ej: Vestiaire Collective, Poshmark..."
                aria-label="Nombre de la página"
                className={`${FIELD_CLASS} mt-3`}
              />
            </div>
          ) : null}

          <div className="mt-6">
            <p className="text-base font-semibold text-neutral-900">Describe los Detalles</p>
            <textarea
              value={draft.details}
              onChange={(event) => update({ details: event.target.value })}
              aria-label="Detalles"
              placeholder="Desgastes, Retoques de color, Cierre roto, etc..."
              rows={4}
              className={`${FIELD_CLASS} mt-3 resize-none`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
