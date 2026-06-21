import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { getProductImageUrl } from '@/src/shared/infrastructure/images/product-image';
import {
  commissionResponseSchema,
  productDetailResponseSchema,
  productsResponseSchema,
  sellerPaymentsResponseSchema,
} from './product-view-schemas';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return getProductImageUrl(path.replace(/^\/+/, ''));
}

export const productViewHttpRepository = {
  async getProducts(view, clientId, query, signal) {
    const params = new URLSearchParams();
    const q = query.q?.trim();
    if (q) params.set('q', q);

    const search = params.toString();
    const path = `/web/products/${view}/${clientId}${search ? `?${search}` : ''}`;

    const response = await httpRequest(path, {
      schema: productsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((item) => ({
      id: item.id,
      uuid: item.uuid,
      name: item.nombre ?? item.modelo ?? '',
      brand: item.marca,
      salePrice: item.original_price,
      earning: item.precio,
      status: item.Estado,
      statusIntern: item.status_intern ?? '',
      image: item.galeria?.[0] ?? '',
    }));
  },

  async getSellerPayments(productId, signal) {
    const response = await httpRequest(`/web/products/${productId}/seller-payments`, {
      schema: sellerPaymentsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((payment) => ({
      id: payment.id,
      amount: payment.monto,
      date: payment.fecha,
      method: payment.metodo,
    }));
  },

  async getProductDetail(productId, signal) {
    const response = await httpRequest(`/web/products/${productId}/detail`, {
      schema: productDetailResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const data = response.data;
    return {
      id: data.id,
      clientId: data.client_id,
      uuid: data.uuid,
      name: data.name_product ?? data.modelo ?? '',
      status: data.estatus || data.Estado || '',
      brand: data.marca ?? '',
      model: data.modelo ?? '',
      department: data.departamento ?? '',
      category: data.categoria ?? '',
      subcategory: data.subcategoria ?? '',
      color: data.color ?? '',
      detail: data.detalle ?? '',
      soldDate: data.Fecha ?? '',
      salePrice: data.original_price,
      earning: data.precio,
      commission: data.original_price - data.precio,
      images: (data.galeria ?? []).map(resolveImageUrl),
    };
  },

  async getCommission(price, clientId, signal) {
    const params = new URLSearchParams({ price: String(price), user_id: String(clientId) });
    const response = await httpRequest(`/web/products/comission?${params.toString()}`, {
      schema: commissionResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const { commission } = response.data;
    return {
      rate: commission.rate,
      sellerNet: commission.seller_net,
      amount: price - commission.seller_net,
    };
  },
} satisfies ProductViewRepository;
