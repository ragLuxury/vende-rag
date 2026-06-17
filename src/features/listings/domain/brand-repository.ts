export interface Brand {
  id: number;
  name: string;
}

export interface BrandRepository {
  getBrands(signal?: AbortSignal): Promise<readonly Brand[]>;
}
