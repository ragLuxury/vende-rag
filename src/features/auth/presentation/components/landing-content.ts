import { VALUATION_INTRO, VALUATION_ITEMS } from '@/src/shared/content/valuation-content';
import { PROCESS_STEPS } from '@/src/shared/content/process-content';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Cómo valuamos', href: '#como-valuamos' },
  { label: 'Nuestro proceso', href: '#nuestro-proceso' },
  { label: 'Por qué elegirnos', href: '#por-que-elegirnos' },
  { label: 'Formas de envío', href: '#formas-de-envio' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
];

export interface ValuationCard {
  icon: string;
  title: string;
  detailIntro?: string;
  detailBullets?: readonly string[];
  detailBody?: string;
}

export { VALUATION_INTRO };

export const VALUATION_CARDS: readonly ValuationCard[] = VALUATION_ITEMS.map((item) => ({
  icon: item.icon,
  title: item.title,
  ...(item.bullets
    ? { detailIntro: item.body, detailBullets: item.bullets }
    : { detailBody: item.body }),
}));

export interface ProcessTab {
  id: string;
  step: string;
  title: string;
  heading: string;
  body: string;
  image: string;
}

export const PROCESS_TABS: readonly ProcessTab[] = PROCESS_STEPS.map((step) => ({
  id: step.id,
  step: `${step.step}. ${step.title}`,
  title: step.title,
  heading: step.heading,
  body: step.body,
  image: step.image,
}));

export interface TimelineMilestone {
  week: string;
  label: string;
}

export const SALE_TIMELINE: readonly TimelineMilestone[] = [
  { week: 'Semana 1', label: 'Producto recibido' },
  { week: 'Semana 2', label: 'Producto publicado' },
  { week: 'Semana 3', label: 'Producto vendido' },
  { week: 'Semana 4', label: 'Recibe tu pago' },
];

export const LAYAWAY_TIMELINE: readonly TimelineMilestone[] = [
  { week: 'Semana 1', label: 'Producto recibido' },
  { week: 'Semana 2', label: 'Producto publicado' },
  { week: 'Semana 3', label: 'Producto vendido' },
  { week: 'Semana 4', label: 'Recibe tu pago (30%)' },
  { week: 'Semana 8', label: 'Recibe tu pago restante (70%)' },
];

export interface WhyConsignItem {
  image: string;
  title: string;
  description: string;
}

export const WHY_CONSIGN: readonly WhyConsignItem[] = [
  {
    image: '/images/consignar/concigna-1.png',
    title: 'Valuaciones precisas',
    description: 'Nuestro equipo te sugiere el mejor precio posible para vender tus piezas.',
  },
  {
    image: '/images/consignar/concigna-2.png',
    title: 'Pagos rápidos',
    description: 'Recibe tu pago desde 2 días después de la venta.',
  },
  {
    image: '/images/consignar/concigna-3.png',
    title: 'Comisiones justas',
    description: 'Comisiones justas y escalonadas para no castigar tu ganancia.',
  },
  {
    image: '/images/consignar/concigna-4.png',
    title: 'Venta continua',
    description: 'Envío de paquetes todos los días del año, a todos los estados de México.',
  },
  {
    image: '/images/consignar/concigna-5.png',
    title: 'Servicio al seller',
    description: 'Equipo de atención a sellers para cualquier duda o comentario.',
  },
];

export interface ShippingOption {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export const SHIPPING_OPTIONS: readonly ShippingOption[] = [
  {
    icon: 'ion:cube-outline',
    title: 'Recolección',
    description:
      '¡Lo hacemos por ti! Recogemos tus productos en cualquier dirección de la ZMG, sin importar la cantidad.',
    ctaLabel: 'Agendar aquí',
    href: '/contacto',
  },
  {
    icon: 'ion:storefront-outline',
    title: 'En Showroom',
    description:
      'Visita alguno de nuestros showrooms y déjanos tus productos. ¡No necesitas cita previa!',
    ctaLabel: 'Saber más',
    href: '/contacto',
  },
  {
    icon: 'ion:send-outline',
    title: 'Envíos',
    description:
      'Puedes mandar tus productos por tu paquetería de confianza. Solo avísanos para esperar tu paquete.',
    ctaLabel: 'Quiero enviar',
    href: '/contacto',
  },
];

export interface FirstTimeCard {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export const FIRST_TIME_CARDS: readonly FirstTimeCard[] = [
  {
    title: 'Consigna con nosotros',
    description: 'Vende piezas que ya no usas y gana dinero rápido.',
    ctaLabel: 'Consignar',
    href: '/vender',
  },
  {
    title: 'Compra en RAG',
    description:
      'Busca entre los más de 1,500 productos que tenemos para ti, con precios inigualables.',
    ctaLabel: 'Comprar',
    href: '/disenadores',
  },
  {
    title: '¿Tienes preguntas?',
    description: 'Estamos para ayudarte, escríbenos para resolver cualquier duda que tengas.',
    ctaLabel: 'Contactar',
    href: '/contacto',
  },
];

export interface NewProduct {
  id: string;
  name: string;
  image: string;
}

// Only 4 distinct product names are available for 6 image slots; the last
// two entries reuse the first two names until real product names are provided.
export const NEW_PRODUCTS: readonly NewProduct[] = [
  {
    id: 'fendi-baguette-tiffany',
    name: 'RAG - Fendi Baguette x Tiffany',
    image: '/images/new-products/new-product-1.jpeg',
  },
  {
    id: 'gucci-crystal-gg',
    name: 'RAG - Gucci Crystal GG',
    image: '/images/new-products/new-product-2.jpeg',
  },
  {
    id: 'hermes-birkin-25-swift',
    name: 'RAG - Hermès Birkin 25 Swift',
    image: '/images/new-products/new-product-3.jpeg',
  },
  {
    id: 'saint-laurent-loulou-small',
    name: 'RAG - Saint Laurent LouLou Small',
    image: '/images/new-products/new-product-4.jpeg',
  },
  {
    id: 'fendi-baguette-tiffany-2',
    name: 'RAG - Fendi Baguette x Tiffany',
    image: '/images/new-products/new-product-5.jpeg',
  },
  {
    id: 'gucci-crystal-gg-2',
    name: 'RAG - Gucci Crystal GG',
    image: '/images/new-products/new-product-6.jpeg',
  },
];

export interface FaqPreviewItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_PREVIEW: readonly FaqPreviewItem[] = [
  {
    id: 'cuanto-cuesta',
    question: '¿Cuánto cuesta vender con ustedes?',
    answer:
      'No tiene costo publicar tus productos. Aplicamos una comisión sobre el precio de venta, escalonada según el producto y el volumen de tus ventas.',
  },
  {
    id: 'para-que-formulario',
    question: '¿Para qué es el formulario?',
    answer:
      'El formulario de venta nos permite conocer tus productos para preparar una propuesta de precio inicial en máximo 2 días hábiles.',
  },
  {
    id: 'como-llenar-formulario',
    question: '¿Cómo se llena el formulario?',
    answer:
      'Solo necesitas indicar marca, modelo y estado de cada pieza, además de fotos de referencia si las tienes a la mano.',
  },
  {
    id: 'no-se-precio',
    question: '¿Qué pasa si no sé en cuánto lo quiero vender?',
    answer:
      'Nuestro equipo te sugiere el mejor precio posible con base en valor de reventa, tendencias de mercado y condición del producto.',
  },
  {
    id: 'vigencia-solicitud',
    question: '¿Por cuánto tiempo es válida la solicitud?',
    answer:
      'La propuesta de precio de tu solicitud es válida durante los días que te indiquemos al enviarla.',
  },
  {
    id: 'despues-de-aceptar',
    question: '¿Qué hago después de haber aceptado una solicitud?',
    answer:
      'Envías tus productos a RAG; una vez recibidos y autenticados, los publicamos y tu solicitud pasa a Publicaciones en tu Panel de Seller.',
  },
];

export interface FooterLinkColumn {
  title: string;
  links: readonly { label: string; href: string }[];
}

export const FOOTER_COLUMNS_GUEST: readonly FooterLinkColumn[] = [
  {
    title: 'Vender',
    links: [
      { label: '¿Cómo Vender?', href: '/vender' },
      { label: 'Términos de Consignación', href: '/terminos' },
    ],
  },
  {
    title: 'Atención al seller',
    links: [
      { label: 'Contacto', href: '/contacto' },
      { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
      { label: 'Términos y Condiciones', href: '/terminos' },
    ],
  },
  {
    title: 'Mi cuenta',
    links: [
      { label: 'Iniciar sesión', href: '/login' },
      { label: 'Crear cuenta', href: '/signup' },
    ],
  },
];

export const FOOTER_COLUMNS_AUTH: readonly FooterLinkColumn[] = [
  {
    title: 'Vender',
    links: [
      { label: '¿Cómo Vender?', href: '/vender' },
      { label: 'Términos de Consignación', href: '/terminos' },
    ],
  },
  {
    title: 'Atención al seller',
    links: [
      { label: 'Contacto', href: '/contacto' },
      { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
      { label: 'Términos y Condiciones', href: '/terminos' },
    ],
  },
  {
    title: 'Mi cuenta',
    links: [
      { label: 'Mi Perfil', href: '/perfil' },
      { label: 'Solicitudes', href: '/solicitudes' },
      { label: 'Publicaciones', href: '/publicaciones' },
    ],
  },
];

export function getFooterColumns(isAuthenticated: boolean): readonly FooterLinkColumn[] {
  return isAuthenticated ? FOOTER_COLUMNS_AUTH : FOOTER_COLUMNS_GUEST;
}

export const SOCIAL_LINKS: readonly { icon: string; label: string; href: string }[] = [
  {
    icon: 'ion:logo-instagram',
    label: 'Instagram Mujer',
    href: 'https://www.instagram.com/rag.mx/',
  },
  {
    icon: 'ion:logo-instagram',
    label: 'Instagram Hombre',
    href: 'https://www.instagram.com/menbyrag_/',
  },
];
