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
  gallery?: readonly NewProductImage[];
}

export interface CreatedProductRef {
  id: number;
  uuid: string;
}

export interface CreateProductsResult {
  inserted: number;
  skipped: number;
  message: string;
  products: readonly CreatedProductRef[];
}

export interface ProductRepository {
  createProducts(
    products: readonly NewProduct[],
    signal?: AbortSignal,
  ): Promise<CreateProductsResult>;
}
