'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import type { SellerPayment } from '@/src/features/product-views/domain/product-view-repository';
import { useCommission } from '../hooks/use-commission';
import { useProductDetail } from '../hooks/use-product-detail';
import { useSellerPayments } from '../hooks/use-seller-payments';
import { ProductGallery } from './product-gallery';
import { getStatusStyle } from './product-status';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

interface ProductDetailScreenProps {
  productId: number;
  view?: string;
}

export function ProductDetailScreen({ productId, view }: ProductDetailScreenProps) {
  const router = useRouter();
  const isSale = view === 'ventas';
  const [infoOpen, setInfoOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { data: commission } = useCommission(
    product?.salePrice ?? 0,
    product?.clientId ?? 0,
    product !== undefined,
  );
  const { data: payments } = useSellerPayments(productId, isSale);

  const earning = commission?.sellerNet ?? product?.earning ?? 0;
  const paid = (payments ?? []).reduce((total, payment) => total + payment.amount, 0);
  const pending = Math.max(earning - paid, 0);
  const saleStatus = pending > 0 ? 'Por Pagar' : 'Pagado';
  const pillStatus = isSale ? saleStatus : (product?.status ?? '');

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <header className="relative flex items-center justify-center px-6 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Detalles de Producto</h1>
      </header>

      <div className="flex-1 pb-10">
        {isLoading ? (
          <p className="py-12 text-center text-sm text-neutral-400">Cargando producto...</p>
        ) : isError || !product ? (
          <p className="py-12 text-center text-sm text-red-600">
            No pudimos cargar el producto. Inténtalo de nuevo.
          </p>
        ) : (
          <>
            <ProductGallery images={product.images} alt={product.name} />

            <div className="flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">{product.name}</h2>
                <p className="text-sm text-neutral-400">#{product.id}</p>
                {isSale && product.soldDate ? (
                  <p className="text-xs text-neutral-400">Fecha de venta: {product.soldDate}</p>
                ) : null}
              </div>
              {pillStatus ? (
                <span
                  className="shrink-0 rounded-full px-5 py-2 text-sm font-medium"
                  style={getStatusStyle(pillStatus)}
                >
                  {pillStatus}
                </span>
              ) : null}
            </div>

            <section className="mt-6 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setInfoOpen((open) => !open)}
                aria-expanded={infoOpen}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <span className="text-base font-semibold text-neutral-900">
                  Información del Producto
                </span>
                <Icon
                  icon="ion:chevron-down-outline"
                  className={`size-5 text-neutral-500 transition-transform ${
                    infoOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {infoOpen ? (
                <dl className="px-6 pb-5">
                  <InfoRow label="Marca" value={product.brand} />
                  <InfoRow label="Modelo" value={product.model} />
                  <InfoRow label="Departamento" value={product.department} />
                  <InfoRow label="Categoría" value={product.category} />
                  <InfoRow label="Subcategoría" value={product.subcategory} />
                  <InfoRow label="Color" value={product.color} />
                </dl>
              ) : null}
            </section>

            {product.detail ? (
              <section className="border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setDetailOpen((open) => !open)}
                  aria-expanded={detailOpen}
                  className="flex w-full items-center justify-between px-6 py-5"
                >
                  <span className="text-base font-semibold text-neutral-900">
                    Detalles del Producto
                  </span>
                  <Icon
                    icon="ion:chevron-down-outline"
                    className={`size-5 text-neutral-500 transition-transform ${
                      detailOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {detailOpen ? (
                  <p className="px-6 pb-5 text-base text-neutral-400">{product.detail}</p>
                ) : null}
              </section>
            ) : null}

            <section className="border-t border-neutral-200 px-6 py-5">
              <h3 className="text-base font-semibold text-neutral-900">Desglose de Precio</h3>
              <dl className="mt-4 space-y-3">
                <PriceRow
                  label={isSale ? 'Precio de venta' : 'Precio de producto'}
                  value={currencyFormatter.format(product.salePrice)}
                />
                <PriceRow
                  label="Comisión RAG"
                  value={`- ${currencyFormatter.format(commission?.amount ?? product.commission)}`}
                />
                <div className="flex items-center justify-between pt-1">
                  <dt className="text-base font-semibold text-neutral-900">Tu Ganancia</dt>
                  <dd className="text-base font-semibold text-neutral-900">
                    {currencyFormatter.format(earning)}
                  </dd>
                </div>
                {isSale ? (
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-neutral-500">
                      {pending > 0 ? 'Por pagar' : 'Pagado'}
                    </dt>
                    <dd className="text-sm text-neutral-400">
                      {currencyFormatter.format(pending > 0 ? pending : paid)}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {isSale ? (
              <section className="border-t border-neutral-200 px-6 py-5">
                <h3 className="text-base font-semibold text-neutral-900">Historial de Pagos</h3>
                {payments && payments.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {payments.map((payment) => (
                      <PaymentRow key={payment.id} payment={payment} />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-base text-neutral-400">Sin pagos registrados.</p>
                )}
              </section>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className="text-base text-neutral-700">{label}</dt>
      <dd className="text-base text-neutral-400">{value || '—'}</dd>
    </div>
  );
}

function PriceRow({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-base text-neutral-700">{label}</dt>
      <dd className="text-base text-neutral-400">{value}</dd>
    </div>
  );
}

function PaymentRow({ payment }: { payment: SellerPayment }) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <p className="text-base text-neutral-700">{currencyFormatter.format(payment.amount)}</p>
        <p className="text-sm text-neutral-400">{payment.method}</p>
      </div>
      <span className="text-sm text-neutral-400">{payment.date}</span>
    </li>
  );
}
