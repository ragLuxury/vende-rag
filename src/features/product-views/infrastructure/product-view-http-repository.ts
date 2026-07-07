import type { ProductViewRepository } from '@/src/features/product-views/domain/product-view-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { getProductImageUrl } from '@/src/shared/infrastructure/images/product-image';
import { getReceiptUrl } from '@/src/shared/infrastructure/images/receipt-document';
import {
  commissionResponseSchema,
  negotiationResponseSchema,
  productDetailResponseSchema,
  productsResponseSchema,
  sellerPaymentsResponseSchema,
} from './product-view-schemas';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return getProductImageUrl(path.replace(/^\/+/, ''));
}

const statusByState: Record<number, string> = {
  1: 'En Revisión',
  2: 'Negociación',
  3: 'Aprobada',
  4: 'Rechazado',
  10: 'Recibido',
  11: 'Activa',
  12: 'Inactivar',
  13: 'Por Devolver',
  14: 'Devuelto',
  20: 'Apartado',
  21: 'Pagado',
};

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

    return response.data.map((item) => {
      const discountPercent = item.porcentaje_descuento ?? 0;
      const discountAmount =
        discountPercent > 0
          ? Math.round((item.original_price * discountPercent) / 100)
          : (item.precio_descuento ?? 0);

      return {
        id: item.id,
        uuid: item.uuid,
        name: item.nombre ?? item.modelo ?? '',
        brand: item.marca,
        salePrice: item.original_price,
        discountAmount,
        earning: item.precio,
        status: item.Estado,
        statusIntern: item.status_intern ?? '',
        image: item.galeria?.[0] ?? '',
      };
    });
  },

  async getSellerPayments(productId, signal) {
    const response = await httpRequest(`/web/products/${productId}/seller-payments`, {
      schema: sellerPaymentsResponseSchema,
      ...(signal ? { signal } : {}),
    });

    return response.data.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      date: payment.payment_date,
      method: payment.payment_method,
      receiptUrl: payment.receipt_path ? getReceiptUrl(payment.receipt_path) : null,
    }));
  },

  async getProductDetail(productId, signal) {
    const response = await httpRequest(`/web/products/${productId}/detail`, {
      schema: productDetailResponseSchema,
      ...(signal ? { signal } : {}),
    });

    const data = response.data;
    const salePrice = data.original_price || (data.rag ?? 0);
    const discountPercent = data.porcentaje_descuento ?? 0;
    const discountAmount =
      discountPercent > 0
        ? Math.round((salePrice * discountPercent) / 100)
        : (data.precio_descuento ?? 0);
    return {
      id: data.id,
      clientId: data.client_id,
      uuid: data.uuid,
      name: data.name_product ?? data.modelo ?? '',
      status: data.estatus || data.Estado || statusByState[data.state ?? 0] || '',
      state: data.state ?? 0,
      brand: data.marca ?? '',
      model: data.modelo ?? '',
      department: data.departamento ?? '',
      category: data.categoria ?? '',
      subcategory: data.subcategoria ?? '',
      color: data.color ?? '',
      detail: data.detalle ?? '',
      soldDate: data.Fecha ?? '',
      salePrice,
      discountAmount,
      discountPercent,
      negotiationPrice: data.rag || data.precio,
      earning: data.precio,
      commission: salePrice - data.precio,
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

  async respondNegotiation(productId, decision, signal) {
    const body =
      decision.action === 'aprobar'
        ? {
            action: decision.action,
            approve_price: decision.approvePrice,
            comment_approval: decision.comment,
          }
        : { action: decision.action, comment_rejection: decision.comment };

    await httpRequest(`/web/products/${productId}/negociacion`, {
      method: 'PATCH',
      body,
      schema: negotiationResponseSchema,
      ...(signal ? { signal } : {}),
    });
  },
} satisfies ProductViewRepository;
