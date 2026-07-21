export interface ValuationItem {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly body: string;
  readonly bullets?: readonly string[];
}

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
