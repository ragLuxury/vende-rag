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
      const products: NewProduct[] = await Promise.all(
        inputs.map(async (input) => {
          const urls = await uploadImagesUseCase(imageRepository, input.photos);

          return {
            brandId: input.brandId,
            origen: input.origen,
            model: input.model,
            price: input.price,
            detail: input.detail,
            linkProducto: input.linkProducto,
            clientId: input.clientId,
            gallery: urls.map((url) => ({ img: url })),
          };
        }),
      );

      return createProductsUseCase(productRepository, products);
    },
  });
}
