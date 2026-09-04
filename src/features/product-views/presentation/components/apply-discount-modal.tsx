'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { HttpError } from '@/src/shared/domain/errors';
import { Modal } from '@/src/shared/ui/modal';
import { useToast } from '@/src/shared/ui/toast';
import { calculateSellerPriceBreakdown } from '@/src/features/product-views/domain/price-breakdown';
import type { DiscountType } from '@/src/features/product-views/domain/product-view-repository';
import { useApplyDiscount } from '../hooks/use-apply-discount';
import { useCommission } from '../hooks/use-commission';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const PRICE_DEBOUNCE_MS = 400;
const SUCCESS_MESSAGE = 'Descuento aplicado correctamente';
const GENERIC_ERROR_MESSAGE = 'No se pudo aplicar el descuento. Intenta de nuevo.';

interface ApplyDiscountModalProps {
  open: boolean;
  productId: number;
  clientId: number;
  currentPrice: number;
  commissionAmount: number;
  onClose: () => void;
}

function resolveErrorMessage(error: unknown): string {
  if (error instanceof HttpError && isMessageBody(error.body)) {
    return error.body.message;
  }
  return GENERIC_ERROR_MESSAGE;
}

function isMessageBody(body: unknown): body is { message: string } {
  return (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    typeof (body as { message: unknown }).message === 'string'
  );
}

export function ApplyDiscountModal({
  open,
  productId,
  clientId,
  currentPrice,
  commissionAmount,
  onClose,
}: ApplyDiscountModalProps) {
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [rawValue, setRawValue] = useState('');
  const { showToast } = useToast();
  const applyDiscount = useApplyDiscount();

  const isPercentage = discountType === 'percentage';
  const numericValue = Number(rawValue);
  const hasValidValue = rawValue.trim() !== '' && Number.isFinite(numericValue) && numericValue > 0;

  const appliedValue = hasValidValue ? numericValue : null;
  const { finalPrice } = calculateSellerPriceBreakdown(currentPrice, {
    fixedDiscount: isPercentage ? null : appliedValue,
    percentageDiscount: isPercentage ? appliedValue : null,
  });

  // Commission is charged on the discounted price and its rate depends on the
  // amount, so the undiscounted one cannot be reused: the preview asks the API
  // again for the final price that would be saved.
  const [debouncedFinalPrice, setDebouncedFinalPrice] = useState(finalPrice);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedFinalPrice(finalPrice), PRICE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [finalPrice]);

  const { data: previewCommission } = useCommission(
    debouncedFinalPrice,
    clientId,
    open && debouncedFinalPrice > 0,
  );
  const isPreviewStale = debouncedFinalPrice !== finalPrice;
  const estimatedProfit =
    !isPreviewStale && previewCommission
      ? previewCommission.sellerNet
      : Math.max(finalPrice - commissionAmount, 0);

  function resetAndClose() {
    setDiscountType('percentage');
    setRawValue('');
    applyDiscount.reset();
    onClose();
  }

  function handleSave() {
    if (!hasValidValue || applyDiscount.isPending) return;

    applyDiscount.mutate(
      { productId, type: discountType, value: numericValue },
      {
        onSuccess: () => {
          showToast(SUCCESS_MESSAGE);
          resetAndClose();
        },
        onError: (error) => showToast(resolveErrorMessage(error)),
      },
    );
  }

  return (
    <Modal open={open} label="Agregar descuento" onClose={resetAndClose}>
      <button
        type="button"
        aria-label="Cerrar"
        onClick={resetAndClose}
        className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:cursor-pointer hover:text-neutral-900"
      >
        <Icon icon="ion:close-outline" className="size-5" />
      </button>

      <h2 className="text-center text-xl font-semibold text-neutral-900">Agregar descuento</h2>
      <p className="mt-2 text-sm text-neutral-500">
        Precio actual: {currencyFormatter.format(currentPrice)}
      </p>

      <div className="mt-5 flex gap-1 rounded-full bg-neutral-100 p-1">
        <button
          type="button"
          onClick={() => setDiscountType('percentage')}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
            isPercentage
              ? 'border border-neutral-200 bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400'
          }`}
        >
          %
        </button>
        <button
          type="button"
          onClick={() => setDiscountType('fixed')}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
            !isPercentage
              ? 'border border-neutral-200 bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400'
          }`}
        >
          $
        </button>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-neutral-900">Descuento</span>
        <div className="focus-within:border-brand mt-2 flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3">
          <span className="text-sm font-medium text-neutral-500">{isPercentage ? '%' : '$'}</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={rawValue}
            onChange={(event) => setRawValue(event.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </label>

      <div className="mt-5 space-y-2 rounded-xl bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Precio final</span>
          <span className="text-sm font-semibold text-neutral-900">
            {currencyFormatter.format(finalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Tu ganancia</span>
          <span className="text-sm font-semibold text-neutral-900">
            {currencyFormatter.format(estimatedProfit)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasValidValue || applyDiscount.isPending}
          className="bg-brand flex items-center justify-center gap-2 rounded-full px-10 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {applyDiscount.isPending ? (
            <Icon icon="ion:sync-outline" className="size-4 animate-spin" />
          ) : null}
          Guardar
        </button>
      </div>
    </Modal>
  );
}
