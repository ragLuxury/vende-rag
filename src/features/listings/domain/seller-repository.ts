export interface Seller {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

export interface SellerRepository {
  getSellers(signal?: AbortSignal): Promise<readonly Seller[]>;
}
