'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import { resolvePayment } from '@/src/features/product-views/domain/payment-status';
import type { SellerPayment } from '@/src/features/product-views/domain/product-view-repository';
import {
  isPublicationApproved,
  isPublicationInfoGenerated,
  resolvePublicationPillLabel,
} from '@/src/features/product-views/domain/publication-status';
// Reused as-is below the desktop product detail (same section LandingScreen and
// profile-screen.tsx render at the bottom of their desktop views); no shared
// cross-feature abstraction exists yet for this read (same precedent as
// profile-screen.tsx's own import of LandingFooter).
// eslint-disable-next-line boundaries/element-types
import { LandingFooter } from '@/src/features/auth/presentation/components/landing-footer';
import { useCommission } from '../hooks/use-commission';
import { useProductDetail } from '../hooks/use-product-detail';
import { useRespondNegotiation } from '../hooks/use-respond-negotiation';
import { useSellerPayments } from '../hooks/use-seller-payments';
import { ProductGallery } from './product-gallery';
import { getStatusStyle } from './product-status';
import { PublicationGenerationChecklist } from './publication-generation-checklist';
import { PublicationTimeline } from './publication-timeline';

const NEGOTIATION_STATE = 2;

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
  const [openSection, setOpenSection] = useState<'info' | 'detail' | null>(null);
  const infoOpen = openSection === 'info';
  const detailOpen = openSection === 'detail';

  function toggleSection(section: 'info' | 'detail') {
    setOpenSection((current) => (current === section ? null : section));
  }
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const isNegotiation = product?.state === NEGOTIATION_STATE;
  const respondNegotiation = useRespondNegotiation();
  const discountAmount = isNegotiation ? 0 : (product?.discountAmount ?? 0);
  const discountedPrice = (product?.salePrice ?? 0) - discountAmount;
  const priceForCommission = (isNegotiation ? product?.negotiationPrice : discountedPrice) ?? 0;
  const { data: commission } = useCommission(
    priceForCommission,
    product?.clientId ?? 0,
    product !== undefined && priceForCommission > 0,
  );
  const { data: payments } = useSellerPayments(productId, isSale);

  const earning =
    commission?.sellerNet ?? (isNegotiation ? product?.negotiationPrice : product?.earning) ?? 0;
  const itemizedPaid = (payments ?? []).reduce((total, payment) => total + payment.amount, 0);
  const { isPaid, paid, pending } = resolvePayment(product?.status ?? '', earning, itemizedPaid);
  const isReceived = (product?.status ?? '').trim().toLowerCase() === 'recibido';
  const pillStatus =
    isReceived && product?.statusIntern
      ? resolvePublicationPillLabel(product.statusIntern)
      : (product?.status ?? '');

  function handleApprove() {
    if (!product) return;
    respondNegotiation.mutate(
      {
        productId,
        decision: {
          action: 'aprobar',
          approvePrice: product.negotiationPrice,
          comment: 'De acuerdo',
        },
      },
      { onSuccess: () => router.back() },
    );
  }

  function handleReject() {
    respondNegotiation.mutate(
      { productId, decision: { action: 'rechazar', comment: 'El precio es muy bajo' } },
      { onSuccess: () => router.back() },
    );
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col md:max-w-7xl">
      <header className="relative flex items-center justify-center px-6 py-4 md:pt-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-6 flex cursor-pointer items-center gap-1.5 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
          <span className="hidden text-sm font-medium md:inline">Regresar</span>
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Detalles de Producto</h1>
      </header>

      <div className="flex-1 pb-10 md:flex md:min-h-0 md:flex-col md:justify-center md:pb-0">
        {isLoading ? (
          <p className="py-12 text-center text-sm text-neutral-400">Cargando producto...</p>
        ) : isError || !product ? (
          <p className="py-12 text-center text-sm text-red-600">
            No pudimos cargar el producto. Inténtalo de nuevo.
          </p>
        ) : (
          <>
            <div className="md:hidden">
              <div className="md:sticky md:top-6">
                <ProductGallery images={product.images} alt={product.name} />
              </div>

              <div className="md:min-w-0">
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

                {view === 'publicaciones' && product.statusIntern ? (
                  <div className="mt-4 px-6">
                    {isPublicationApproved(product.statusIntern) ? (
                      <PublicationGenerationChecklist
                        infoGenerated={isPublicationInfoGenerated(product.statusIntern)}
                        hasVideo={product.hasVideo}
                        hasPhotos={product.hasPhotos}
                        hasTag={product.hasTag}
                      />
                    ) : (
                      <PublicationTimeline statusIntern={product.statusIntern} />
                    )}
                  </div>
                ) : null}

                <section className="mt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => toggleSection('info')}
                    aria-expanded={infoOpen}
                    className="flex w-full items-center justify-between px-6 py-5"
                  >
                    <span className="text-sm font-semibold text-neutral-900">
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
                      onClick={() => toggleSection('detail')}
                      aria-expanded={detailOpen}
                      className="flex w-full items-center justify-between px-6 py-5"
                    >
                      <span className="text-sm font-semibold text-neutral-900">
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
                      <p className="px-6 pb-5 text-sm text-neutral-400">{product.detail}</p>
                    ) : null}
                  </section>
                ) : null}

                <section className="border-t border-neutral-200 px-6 py-5">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {isNegotiation ? 'Negociación' : 'Desglose de Precio'}
                  </h3>
                  <dl className="mt-4 space-y-3">
                    <PriceRow
                      label={
                        isNegotiation
                          ? 'Precio de Negociación'
                          : isSale
                            ? 'Precio de venta'
                            : 'Precio de producto'
                      }
                      value={currencyFormatter.format(
                        isNegotiation ? product.negotiationPrice : product.salePrice,
                      )}
                    />
                    {discountAmount > 0 ? (
                      <PriceRow
                        label={
                          product.discountPercent > 0
                            ? `Descuento (${product.discountPercent}%)`
                            : 'Descuento'
                        }
                        value={`- ${currencyFormatter.format(discountAmount)}`}
                      />
                    ) : null}
                    <PriceRow
                      label="Comisión RAG"
                      value={`- ${currencyFormatter.format(commission?.amount ?? product.commission)}`}
                    />
                    <div className="flex items-center justify-between pt-1">
                      <dt className="text-sm font-semibold text-neutral-900">Tu Ganancia</dt>
                      <dd className="text-sm font-semibold text-neutral-900">
                        {currencyFormatter.format(earning)}
                      </dd>
                    </div>
                    {isSale ? (
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-neutral-500">
                          {isPaid ? 'Pagado' : 'Por pagar'}
                        </dt>
                        <dd className="text-sm text-neutral-400">
                          {currencyFormatter.format(isPaid ? paid : pending)}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </section>

                {isNegotiation ? (
                  <div className="flex gap-4 px-6 py-5">
                    <button
                      type="button"
                      onClick={handleReject}
                      disabled={respondNegotiation.isPending}
                      className="flex-1 rounded-full bg-neutral-200 py-4 text-sm font-medium text-neutral-900 disabled:opacity-50"
                    >
                      Rechazar
                    </button>
                    <button
                      type="button"
                      onClick={handleApprove}
                      disabled={respondNegotiation.isPending}
                      className="bg-brand flex-1 rounded-full py-3 text-sm font-medium text-white disabled:opacity-50"
                    >
                      Aceptar
                    </button>
                  </div>
                ) : null}

                {isSale ? (
                  <section className="border-t border-neutral-200 px-6 py-5">
                    <h3 className="text-sm font-semibold text-neutral-900">Historial de Pagos</h3>
                    {payments && payments.length > 0 ? (
                      <ul className="mt-4 space-y-3">
                        {payments.map((payment) => (
                          <PaymentRow key={payment.id} payment={payment} />
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-neutral-400">Sin pagos registrados.</p>
                    )}
                  </section>
                ) : null}
              </div>
            </div>

            <div className="hidden items-start gap-8 px-8 pb-8 md:flex">
              <div className="w-2/5 shrink-0 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 md:h-[40rem]">
                <ProductGallery images={product.images} alt={product.name} fill />
              </div>

              <div className="scrollbar-hide flex min-w-0 flex-1 flex-col rounded-3xl border border-neutral-200 p-10 md:h-[40rem] md:overflow-y-auto">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                      #{product.id}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{product.name}</h2>
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

                {view === 'publicaciones' && product.statusIntern ? (
                  <div className="mt-6">
                    {isPublicationApproved(product.statusIntern) ? (
                      <PublicationGenerationChecklist
                        infoGenerated={isPublicationInfoGenerated(product.statusIntern)}
                        hasVideo={product.hasVideo}
                        hasPhotos={product.hasPhotos}
                        hasTag={product.hasTag}
                      />
                    ) : (
                      <PublicationTimeline statusIntern={product.statusIntern} />
                    )}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col border-t border-neutral-200">
                  <section>
                    {isSale ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleSection('info')}
                          aria-expanded={infoOpen}
                          className="flex w-full items-center justify-between py-5"
                        >
                          <span className="text-sm font-semibold text-neutral-900">
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
                          <div className="grid grid-cols-2 gap-x-8 gap-y-7 pb-6">
                            <DetailField label="Marca" value={product.brand} />
                            <DetailField label="Modelo" value={product.model} />
                            <DetailField label="Departamento" value={product.department} />
                            <DetailField label="Categoría" value={product.category} />
                            <DetailField label="Subcategoría" value={product.subcategory} />
                            <DetailField label="Color" value={product.color} />
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <h3 className="w-full py-5 text-sm font-semibold text-neutral-900">
                          Información del Producto
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-7 pb-6">
                          <DetailField label="Marca" value={product.brand} />
                          <DetailField label="Modelo" value={product.model} />
                          <DetailField label="Departamento" value={product.department} />
                          <DetailField label="Categoría" value={product.category} />
                          <DetailField label="Subcategoría" value={product.subcategory} />
                          <DetailField label="Color" value={product.color} />
                        </div>
                      </>
                    )}
                  </section>

                  {product.detail ? (
                    <section className="border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => toggleSection('detail')}
                        aria-expanded={detailOpen}
                        className="flex w-full items-center justify-between py-5"
                      >
                        <span className="text-sm font-semibold text-neutral-900">
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
                        <p className="pb-6 text-sm text-neutral-500">{product.detail}</p>
                      ) : null}
                    </section>
                  ) : null}
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {isNegotiation ? 'Negociación' : 'Desglose de Precio'}
                  </h3>

                  <dl className="mt-4 space-y-3">
                    <PriceRow
                      label={
                        isNegotiation
                          ? 'Precio de Negociación'
                          : isSale
                            ? 'Precio de venta'
                            : 'Precio de producto'
                      }
                      value={currencyFormatter.format(
                        isNegotiation ? product.negotiationPrice : product.salePrice,
                      )}
                    />
                    {discountAmount > 0 ? (
                      <PriceRow
                        label={
                          product.discountPercent > 0
                            ? `Descuento (${product.discountPercent}%)`
                            : 'Descuento'
                        }
                        value={`- ${currencyFormatter.format(discountAmount)}`}
                      />
                    ) : null}
                    <PriceRow
                      label="Comisión RAG"
                      value={`- ${currencyFormatter.format(commission?.amount ?? product.commission)}`}
                    />
                    <div className="flex items-center justify-between pt-1">
                      <dt className="text-sm font-semibold text-neutral-900">Tu Ganancia</dt>
                      <dd className="text-sm font-semibold text-neutral-900">
                        {currencyFormatter.format(earning)}
                      </dd>
                    </div>
                  </dl>

                  {isSale ? (
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-neutral-500">{isPaid ? 'Pagado' : 'Por pagar'}</span>
                      <span className="text-neutral-400">
                        {currencyFormatter.format(isPaid ? paid : pending)}
                      </span>
                    </div>
                  ) : null}

                  {isNegotiation ? (
                    <div className="mt-6 flex gap-4">
                      <button
                        type="button"
                        onClick={handleReject}
                        disabled={respondNegotiation.isPending}
                        className="flex-1 rounded-full bg-neutral-200 py-4 text-sm font-medium text-neutral-900 disabled:opacity-50"
                      >
                        Rechazar
                      </button>
                      <button
                        type="button"
                        onClick={handleApprove}
                        disabled={respondNegotiation.isPending}
                        className="bg-brand flex-1 rounded-full py-3 text-sm font-medium text-white disabled:opacity-50"
                      >
                        Aceptar
                      </button>
                    </div>
                  ) : null}

                  {isSale ? (
                    <div className="mt-6 border-t border-neutral-200 pt-6">
                      <h3 className="text-sm font-semibold text-neutral-900">Historial de Pagos</h3>
                      {payments && payments.length > 0 ? (
                        <ul className="mt-4 space-y-3">
                          {payments.map((payment) => (
                            <PaymentRow key={payment.id} payment={payment} />
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-neutral-400">Sin pagos registrados.</p>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <LandingFooter isAuthenticated />
            </div>
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
      <dt className="text-sm text-neutral-700">{label}</dt>
      <dd className="text-sm text-neutral-400">{value || '—'}</dd>
    </div>
  );
}

function PriceRow({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm text-neutral-700">{label}</dt>
      <dd className="text-sm text-neutral-400">{value}</dd>
    </div>
  );
}

function DetailField({ label, value }: RowProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-neutral-900 uppercase">{label}</p>
      <p className="mt-1 text-sm text-neutral-500">{value || '—'}</p>
    </div>
  );
}

function PaymentRow({ payment }: { payment: SellerPayment }) {
  return (
    <li className="rounded-2xl border border-neutral-200 px-5 py-4">
      <div className="flex items-center">
        <p className="text-2xl font-semibold text-neutral-900">
          {currencyFormatter.format(payment.amount)}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Icon icon="ion:calendar-outline" className="size-4" />
          {payment.date}
        </span>
        {payment.receiptUrl ? (
          <a
            href={payment.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand flex items-center gap-1.5 text-neutral-500 transition-colors"
          >
            <Icon icon="ion:receipt-outline" className="size-4" />
            Comprobante
          </a>
        ) : null}
      </div>
    </li>
  );
}
