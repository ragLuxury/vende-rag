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
  price: number;
  detail: string;
  clientId: number;
  photos: readonly File[];
}

export function useCreateProduct() {
  const imageRepository = useImageRepository();
  const productRepository = useProductRepository();

  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const urls = await uploadImagesUseCase(imageRepository, input.photos);

      const product: NewProduct = {
        brandId: input.brandId,
        origen: input.origen,
        model: input.model,
        price: input.price,
        detail: input.detail,
        clientId: input.clientId,
        gallery: urls.map((url) => ({ img: url })),
      };

      return createProductsUseCase(productRepository, [product]);
    },
  });
}
