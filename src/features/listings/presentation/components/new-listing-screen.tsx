'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { canListOnBehalf } from '@/src/features/listings/domain/on-behalf';
import { useCreateProducts, type CreateProductInput } from '../hooks/use-create-products';
import {
  createEmptyDraft,
  isDraftValid,
  PRELOVED_ORIGIN,
  ProductDraftCard,
  type ProductDraft,
} from './product-draft-card';

interface NewListingScreenProps {
  userId: number | null;
  userEmail: string | null;
}

function toCreateInput(draft: ProductDraft, clientId: number): CreateProductInput {
  return {
    brandId: draft.brandId as number,
    origen: Number(draft.origin),
    model: draft.description,
    price: Number(draft.price),
    detail: draft.details,
    linkProducto: draft.origin === PRELOVED_ORIGIN ? draft.pageName.trim() : '',
    clientId,
    photos: draft.photos,
  };
}

export function NewListingScreen({ userId, userEmail }: NewListingScreenProps) {
  const router = useRouter();
  const createProducts = useCreateProducts();

  const canDelegate = canListOnBehalf(userEmail);

  const [drafts, setDrafts] = useState<readonly ProductDraft[]>(() => [createEmptyDraft()]);
  const [openId, setOpenId] = useState(() => drafts[0]?.id ?? '');

  const isValid =
    (canDelegate || userId !== null) &&
    drafts.length > 0 &&
    drafts.every((draft) => isDraftValid(draft, canDelegate));

  function handleChange(updated: ProductDraft) {
    setDrafts((current) => current.map((draft) => (draft.id === updated.id ? updated : draft)));
  }

  function handleAddProduct() {
    const draft = createEmptyDraft();
    setDrafts((current) => [...current, draft]);
    setOpenId(draft.id);
  }

  function handleRemove(id: string) {
    setDrafts((current) => {
      const next = current.filter((draft) => draft.id !== id);
      if (id === openId) setOpenId(next[next.length - 1]?.id ?? '');
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    const inputs: CreateProductInput[] = [];
    for (const draft of drafts) {
      const clientId = canDelegate ? draft.sellerId : userId;
      if (clientId === null) return;
      inputs.push(toCreateInput(draft, clientId));
    }

    createProducts.mutate(inputs, {
      onSuccess: () => {
        const draft = createEmptyDraft();
        setDrafts([draft]);
        setOpenId(draft.id);
      },
    });
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col md:max-w-3xl">
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
        <div className="flex flex-col gap-4">
          {drafts.map((draft, index) => (
            <ProductDraftCard
              key={draft.id}
              index={index}
              draft={draft}
              userId={userId}
              canDelegate={canDelegate}
              open={draft.id === openId}
              canRemove={drafts.length > 1}
              onToggle={() => setOpenId(draft.id === openId ? '' : draft.id)}
              onChange={handleChange}
              onRemove={() => handleRemove(draft.id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="border-brand text-brand mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed text-base font-medium"
        >
          <Icon icon="ion:add-outline" className="size-5" />
          Agregar otro producto
        </button>

        <p className="mt-8 text-center text-sm leading-relaxed text-neutral-700">
          Al dar clic en el botón de &quot;ENVIAR&quot; Acepto los{' '}
          <Link href="/terminos" className="text-brand underline">
            &quot;Términos y condiciones&quot;
          </Link>{' '}
          y{' '}
          <Link href="/privacidad" className="text-brand underline">
            &quot;Aviso de privacidad&quot;
          </Link>
        </p>

        {createProducts.isSuccess ? (
          <p className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            {createProducts.data.message}
          </p>
        ) : null}
        {createProducts.isError ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            No pudimos enviar tu solicitud. Inténtalo de nuevo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isValid || createProducts.isPending}
          className={`mt-6 flex h-14 w-full items-center justify-center rounded-2xl text-base font-medium transition-colors ${
            isValid && !createProducts.isPending
              ? 'bg-brand hover:bg-brand/90 text-white'
              : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
          }`}
        >
          {createProducts.isPending
            ? 'Enviando...'
            : `Enviar solicitud${drafts.length > 1 ? ` (${drafts.length})` : ''}`}
        </button>
      </form>

      <BottomNav />
    </div>
  );
}
