'use client';

import { useMutation } from '@tanstack/react-query';
import { useImageRepository } from '@/src/features/listings/application/image-repository-context';
import { useProductRepository } from '@/src/features/listings/application/product-repository-context';
import { createProductsUseCase } from '@/src/features/listings/application/create-products.usecase';
import { uploadStagingImagesUseCase } from '@/src/features/listings/application/upload-staging-images.usecase';
import type { NewProduct } from '@/src/features/listings/domain/product-repository';

const STAGING_UPLOAD_TIMEOUT_MS = 60_000;

export interface CreateProductInput {
  brandId: number;
  origen: number;
  model: string;
  price: number | null;
  detail: string;
  linkProducto: string;
  clientId: number;
  photos: readonly File[];
}

export function useCreateProducts() {
  const imageRepository = useImageRepository();
  const productRepository = useProductRepository();

  return useMutation({
    mutationFn: async (inputs: readonly CreateProductInput[]) => {
      // 1) Subir las fotos a staging. Si alguna falla (o excede el timeout), se
      //    aborta antes de crear el producto: no queda ni producto ni imágenes.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), STAGING_UPLOAD_TIMEOUT_MS);

      let stagedGalleries: readonly (readonly string[])[];
      try {
        stagedGalleries = await Promise.all(
          inputs.map((input) =>
            input.photos.length > 0
              ? uploadStagingImagesUseCase(imageRepository, input.photos, controller.signal)
              : Promise.resolve<readonly string[]>([]),
          ),
        );
      } finally {
        clearTimeout(timeoutId);
      }

      // 2) Crear los productos con su galería de staging. El backend promueve
      //    las imágenes al folder del producto y registra la galería dentro de
      //    una transacción: si algo falla, hace rollback (todo o nada).
      const products: NewProduct[] = inputs.map((input, i) => ({
        brandId: input.brandId,
        origen: input.origen,
        model: input.model,
        price: input.price,
        detail: input.detail,
        linkProducto: input.linkProducto,
        clientId: input.clientId,
        gallery: (stagedGalleries[i] ?? []).map((img) => ({ img })),
      }));

      return createProductsUseCase(productRepository, products);
    },
  });
}
