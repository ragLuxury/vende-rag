export interface ValuationItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  bullets?: readonly string[];
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  heading: string;
  body: string;
}

export const WELCOME = {
  title: 'Bienvenido a RAG',
  body: 'Estás cerca de vender en la plataforma líder de consignación de lujo en México. Nuestro Panel de Seller automatiza solicitudes y ventas. RAG gestiona fotos, autenticación, publicación y post-venta.',
} as const;

export const VALUATION_INTRO =
  'Los precios de los productos se establecen mediante una combinación del conocimiento de nuestros curadores y los resultados de nuestro algoritmo, que analiza precios de mercado y ventas pasadas. Nuestro esquema de comisiones nos alinea con el cliente para vender al mejor precio posible.';

export const VALUATION_ITEMS: readonly ValuationItem[] = [
  {
    id: 'valor-reventa',
    icon: '/images/valuation/valor-reventa-icon.png',
    title: 'Valor de reventa',
    body: 'Varía dependiendo de ciertos factores como:',
    bullets: [
      'Marca',
      'Modelo',
      'Ediciones Limitadas',
      'Colaboraciones',
      'Productos de temporada',
      'Escasez',
    ],
  },
  {
    id: 'tendencias-mercado',
    icon: '/images/valuation/tendencia-mercado-icon.png',
    title: 'Tendencias de mercado',
    body: 'Nuestro algoritmo determina los mejores precios posibles al analizar la demanda y oferta de productos en el mercado, así como las búsquedas y ventas previas en nuestro sitio.',
  },
  {
    id: 'condicion-producto',
    icon: '/images/valuation/condicion-producto-icon.png',
    title: 'Condición del producto',
    body: 'Los productos nuevos o en excelente estado se venden más caros y 3 veces más rápido. No aceptamos productos rotos, con daños considerables o con defectos que afecten su estética.',
  },
];

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'solicitudes',
    step: 1,
    title: 'Solicitudes',
    heading: 'Negociación de precios',
    body: 'Después de completar el formulario de venta, nuestro equipo te enviará una propuesta de precio en máximo 2 días hábiles. Al aceptar el precio y enviar tus productos a RAG, tus solicitudes se convertirán en publicaciones en nuestro sitio y podrás gestionarlas desde el Panel de Seller.',
  },
  {
    id: 'autenticacion',
    step: 2,
    title: 'Autenticación',
    heading: 'Nuestro equipo de autentificación',
    body: 'Todos los productos recibidos pasan por un minucioso proceso de autenticación por medio de una revisión física y de un software de Inteligencia Artificial para asegurar que todo lo publicado en nuestro sitio sea auténtico.',
  },
  {
    id: 'publicacion',
    step: 3,
    title: 'Publicación',
    heading: 'Verificamos y publicamos tu producto en RAG',
    body: 'Una vez que los productos pasan nuestro filtro de autenticación, tomamos fotografías y creamos contenido atractivo para su publicación. Nuestras estrategias de venta y promoción, tanto en plataformas físicas como digitales, maximizan la visibilidad y aumentan las posibilidades de concretar la venta.',
  },
  {
    id: 'pago',
    step: 4,
    title: 'Pago',
    heading: 'Condiciones únicas de pago',
    body: 'Los pagos a vendedores se hacen el siguiente martes tras la compra. Si el producto está apartado, recibes 30% y el 70% restante un mes después al liquidar el cliente. Somos la única plataforma que paga apartados antes de la liquidación. Si el cliente no paga, RAG cubre el monto restante.',
  },
];
