'use client';

import { useMutation } from '@tanstack/react-query';
import { useImageRepository } from '@/src/features/listings/application/image-repository-context';
import { useProductRepository } from '@/src/features/listings/application/product-repository-context';
import { createProductsUseCase } from '@/src/features/listings/application/create-products.usecase';
import { uploadImagesUseCase } from '@/src/features/listings/application/upload-images.usecase';
import type { NewProduct } from '@/src/features/listings/domain/product-repository';

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
      const products: NewProduct[] = inputs.map((input) => ({
        brandId: input.brandId,
        origen: input.origen,
        model: input.model,
        price: input.price,
        detail: input.detail,
        linkProducto: input.linkProducto,
        clientId: input.clientId,
      }));

      const result = await createProductsUseCase(productRepository, products);

      await Promise.all(
        result.products.map(async (created, i) => {
          const input = inputs[i];
          if (input?.photos && input.photos.length > 0) {
            await uploadImagesUseCase(imageRepository, input.photos, created.id);
          }
        }),
      );

      return result;
    },
  });
}
