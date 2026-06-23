'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { BrandSelectField } from './brand-select-field';
import { OriginSelectField } from './origin-select-field';
import { useCommission } from '../hooks/use-commission';
import { useCreateProduct } from '../hooks/use-create-product';
import { MIN_PHOTOS, PhotoUploader } from './photo-uploader';

const PRICE_DEBOUNCE_MS = 400;

const PRELOVED_ORIGIN = '2';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

interface NewListingScreenProps {
  userId: number | null;
}

export function NewListingScreen({ userId }: NewListingScreenProps) {
  const router = useRouter();
  const [photos, setPhotos] = useState<readonly File[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [debouncedPrice, setDebouncedPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [pageName, setPageName] = useState('');
  const [details, setDetails] = useState('');

  const isPreloved = origin === PRELOVED_ORIGIN;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedPrice(price), PRICE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [price]);

  const { data: commission, isFetching: isCommissionLoading } = useCommission(
    Number(debouncedPrice),
    userId,
  );

  const createProduct = useCreateProduct();

  const isValid =
    photos.length >= MIN_PHOTOS &&
    brandId !== null &&
    origin !== '' &&
    Number(price) > 0 &&
    (!isPreloved || pageName.trim() !== '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || brandId === null || userId === null) return;

    createProduct.mutate(
      {
        brandId,
        origen: Number(origin),
        model: description,
        price: Number(price),
        detail: details,
        linkProducto: isPreloved ? pageName.trim() : '',
        clientId: userId,
        photos,
      },
      {
        onSuccess: () => {
          setPhotos([]);
          setBrandId(null);
          setDescription('');
          setPrice('');
          setDebouncedPrice('');
          setOrigin('');
          setPageName('');
          setDetails('');
        },
      },
    );
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <header className="relative flex items-center justify-center px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Nueva Solicitud</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 pb-28">
        <PhotoUploader photos={photos} onChange={setPhotos} />

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Información del Producto</h2>
          <div className="mt-4 flex flex-col gap-4">
            <BrandSelectField value={brandId} onSelect={(brand) => setBrandId(brand.id)} />
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              aria-label="Descripción"
              placeholder="Descripción"
              className={FIELD_CLASS}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Información de Venta</h2>

          <div className="mt-4">
            <label htmlFor="price" className="flex items-center gap-2 text-base text-neutral-800">
              ¿En cuanto te gustaría venderlo?
              <Icon icon="ion:information-circle-outline" className="size-5 text-neutral-400" />
            </label>
            <input
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value.replace(/[^\d]/g, ''))}
              inputMode="numeric"
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
              value={origin}
              onSelect={(value) => {
                setOrigin(value);
                if (value !== PRELOVED_ORIGIN) setPageName('');
              }}
            />
          </div>

          {isPreloved ? (
            <div className="mt-6">
              <label htmlFor="page-name" className="text-base text-neutral-800">
                Nombre de la página.
              </label>
              <input
                id="page-name"
                value={pageName}
                onChange={(event) => setPageName(event.target.value)}
                placeholder="Ej: Vestiaire Collective, Poshmark..."
                className={`${FIELD_CLASS} mt-3`}
              />
            </div>
          ) : null}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Describe los Detalles</h2>
          <textarea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            aria-label="Detalles"
            placeholder="Desgastes, Retoques de color, Cierre roto, etc..."
            rows={4}
            className={`${FIELD_CLASS} mt-4 resize-none`}
          />
        </section>

        <p className="mt-8 text-center text-sm leading-relaxed text-neutral-700">
          Al dar clic en el botón de &quot;ENVIAR&quot; Acepto los{' '}
          <Link href="/terminos" className="text-brand underline">
            &quot;Términos y condiciones&quot;
          </Link>{' '}
          y{' '}
          <Link href="/aviso-de-privacidad" className="text-brand underline">
            &quot;Aviso de privacidad&quot;
          </Link>
        </p>

        {createProduct.isSuccess ? (
          <p className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            {createProduct.data.message}
          </p>
        ) : null}
        {createProduct.isError ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            No pudimos enviar tu solicitud. Inténtalo de nuevo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isValid || createProduct.isPending}
          className={`mt-6 flex h-14 w-full items-center justify-center rounded-2xl text-base font-medium transition-colors ${
            isValid && !createProduct.isPending
              ? 'bg-brand hover:bg-brand/90 text-white'
              : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
          }`}
        >
          {createProduct.isPending ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>

      <BottomNav />
    </div>
  );
}
