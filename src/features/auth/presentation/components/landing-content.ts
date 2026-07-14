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
  description: string;
}

export const VALUATION_INTRO =
  'Los precios de los productos se establecen mediante una combinación del conocimiento de nuestros curadores y los resultados de nuestro algoritmo, que analiza precios de mercado y ventas pasadas. Nuestro esquema de comisiones nos alinea con el cliente para vender al mejor precio posible.';

export const VALUATION_CARDS: readonly ValuationCard[] = [
  {
    icon: '/images/valor-reventa-icon.png',
    title: 'Valor de reventa',
    description:
      'Consideramos marca, modelo y ediciones limitadas para estimar cuánto vale realmente tu pieza en el mercado de lujo.',
  },
  {
    icon: '/images/tendencia-mercado-icon.png',
    title: 'Tendencias de mercado',
    description:
      'Nuestro algoritmo analiza la demanda actual para publicar tu producto al mejor precio posible.',
  },
  {
    icon: '/images/condicion-producto-icon.png',
    title: 'Condición del producto',
    description:
      'Las piezas nuevas o en excelente estado se venden más rápido y alcanzan un precio premium.',
  },
];

export interface ProcessTab {
  id: string;
  step: string;
  title: string;
  heading: string;
  body: string;
}

export const PROCESS_TABS: readonly ProcessTab[] = [
  {
    id: 'solicitudes',
    step: '1. Solicitudes',
    title: 'Solicitudes',
    heading: 'Negociación de precios',
    body: 'Después de completar el formulario de venta, nuestro equipo te enviará una propuesta de precio en máximo 2 días hábiles. Al aceptar el precio y enviar tus productos a RAG, tus solicitudes se convertirán en publicaciones en nuestro sitio y podrás gestionarlas desde el Panel de Seller.',
  },
  {
    id: 'autenticacion',
    step: '2. Autenticación',
    title: 'Autenticación',
    heading: 'Nuestro equipo de autentificación',
    body: 'Todos los productos recibidos pasan por un minucioso proceso de autenticación por medio de una revisión física y de un software de Inteligencia Artificial para asegurar que todo lo publicado en nuestro sitio sea auténtico.',
  },
  {
    id: 'publicacion',
    step: '3. Publicación',
    title: 'Publicación',
    heading: 'Verificamos y publicamos tu producto en RAG',
    body: 'Una vez que los productos pasan nuestro filtro de autenticación, tomamos fotografías y creamos contenido atractivo para su publicación. Nuestras estrategias de venta y promoción, tanto en plataformas físicas como digitales, maximizan la visibilidad y aumentan las posibilidades de concretar la venta.',
  },
  {
    id: 'pago',
    step: '4. Pago',
    title: 'Pago',
    heading: 'Condiciones únicas de pago',
    body: 'Los pagos a vendedores se hacen el siguiente martes tras la compra. Si el producto está apartado, recibes 30% y el 70% restante un mes después al liquidar el cliente. Somos la única plataforma que paga apartados antes de la liquidación. Si el cliente no paga, RAG cubre el monto restante.',
  },
];

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
  icon: string;
  title: string;
  description: string;
}

export const WHY_CONSIGN: readonly WhyConsignItem[] = [
  {
    icon: 'ion:calculator-outline',
    title: 'Valuaciones precisas',
    description: 'Nuestro equipo te sugiere el mejor precio posible para vender tus piezas.',
  },
  {
    icon: 'ion:cash-outline',
    title: 'Pagos rápidos',
    description: 'Recibe tu pago desde 2 días después de la venta.',
  },
  {
    icon: 'ion:pricetags-outline',
    title: 'Comisiones justas',
    description: 'Comisiones justas y escalonadas para no castigar tu ganancia.',
  },
  {
    icon: 'ion:repeat-outline',
    title: 'Venta continua',
    description: 'Envío de paquetes todos los días del año, a todos los estados de México.',
  },
  {
    icon: 'ion:headset-outline',
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
}

export const NEW_PRODUCTS: readonly NewProduct[] = [
  { id: 'fendi-baguette-tiffany', name: 'RAG - Fendi Baguette x Tiffany' },
  { id: 'gucci-crystal-gg', name: 'RAG - Gucci Crystal GG' },
  { id: 'hermes-birkin-25-swift', name: 'RAG - Hermès Birkin 25 Swift' },
  { id: 'saint-laurent-loulou-small', name: 'RAG - Saint Laurent LouLou Small' },
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
  { icon: 'ion:logo-instagram', label: 'Instagram', href: 'https://instagram.com' },
  { icon: 'ion:logo-facebook', label: 'Facebook', href: 'https://facebook.com' },
  { icon: 'ion:logo-pinterest', label: 'Pinterest', href: 'https://pinterest.com' },
];
