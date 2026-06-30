export type ProductView = 'solicitudes' | 'publicaciones' | 'devoluciones' | 'ventas';

export interface Product {
  id: number;
  uuid: string;
  name: string;
  brand: string;
  salePrice: number;
  earning: number;
  status: string;
  statusIntern: string;
  image: string;
}

export interface ProductViewQuery {
  q?: string;
}

export interface SellerPayment {
  id: number;
  amount: number;
  date: string;
  method: string;
  receiptUrl: string | null;
}

export interface ProductCommission {
  rate: number;
  amount: number;
  sellerNet: number;
}

export interface ProductDetail {
  id: number;
  clientId: number;
  uuid: string;
  name: string;
  status: string;
  state: number;
  brand: string;
  model: string;
  department: string;
  category: string;
  subcategory: string;
  color: string;
  detail: string;
  soldDate: string;
  salePrice: number;
  negotiationPrice: number;
  earning: number;
  commission: number;
  images: readonly string[];
}

export type NegotiationDecision =
  | { action: 'aprobar'; approvePrice: number; comment: string }
  | { action: 'rechazar'; comment: string };

export interface ProductViewRepository {
  getProducts(
    view: ProductView,
    clientId: number,
    query: ProductViewQuery,
    signal?: AbortSignal,
  ): Promise<readonly Product[]>;
  getSellerPayments(productId: number, signal?: AbortSignal): Promise<readonly SellerPayment[]>;
  getProductDetail(productId: number, signal?: AbortSignal): Promise<ProductDetail>;
  getCommission(price: number, clientId: number, signal?: AbortSignal): Promise<ProductCommission>;
  respondNegotiation(
    productId: number,
    decision: NegotiationDecision,
    signal?: AbortSignal,
  ): Promise<void>;
}
