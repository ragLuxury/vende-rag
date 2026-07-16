'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductIdByUuid } from '@/src/features/product-views/presentation/hooks/use-product-id-by-uuid';

interface LegacyProductRedirectProps {
  uuid: string;
  view: string;
}

/**
 * Resolves a legacy `/cuenta/producto?id={uuid}&back={origen}` link to its new
 * `/productos/{id}` equivalent. Requires a client-side lookup (the uuid -> numeric
 * id mapping isn't known statically) authenticated with the browser's JWT, so this
 * can't be a `next.config.ts` redirect or a server Route Handler.
 */
export function LegacyProductRedirect({ uuid, view }: LegacyProductRedirectProps) {
  const router = useRouter();
  const { data: productId, isError } = useProductIdByUuid(uuid);
  const notFound = uuid.length === 0 || isError;

  useEffect(() => {
    if (productId === undefined) return;
    router.replace(`/productos/${productId}?view=${encodeURIComponent(view)}`);
  }, [productId, view, router]);

  if (notFound) {
    return (
      <div className="py-12 text-center text-sm">
        <p className="text-red-600">Producto no encontrado.</p>
        <Link href="/solicitudes" className="mt-2 inline-block text-neutral-600 underline">
          Volver a solicitudes
        </Link>
      </div>
    );
  }

  return <p className="py-12 text-center text-sm text-neutral-400">Cargando...</p>;
}
