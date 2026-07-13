export interface NewProductImage {
  img: string;
}

export interface NewProduct {
  brandId: number;
  origen: number;
  model: string;
  price: number | null;
  detail: string;
  linkProducto: string;
  clientId: number;
  gallery: readonly NewProductImage[];
}

export interface CreateProductsResult {
  inserted: number;
  skipped: number;
  message: string;
}

export interface ProductRepository {
  createProducts(
    products: readonly NewProduct[],
    signal?: AbortSignal,
  ): Promise<CreateProductsResult>;
}
