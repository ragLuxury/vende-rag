import {
  VALUATION_INTRO,
  VALUATION_ITEMS,
  type ValuationItem,
} from '@/src/shared/content/valuation-content';
import { PROCESS_STEPS, type ProcessStep } from '@/src/shared/content/process-content';

export const WELCOME = {
  title: 'Bienvenido a RAG',
  body: 'Estás cerca de vender en la plataforma líder de consignación de lujo en México. Nuestro Panel de Seller automatiza solicitudes y ventas. RAG gestiona fotos, autenticación, publicación y post-venta.',
} as const;

export { VALUATION_INTRO, VALUATION_ITEMS, PROCESS_STEPS };
export type { ValuationItem, ProcessStep };
