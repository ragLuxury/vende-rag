export interface ShippingOption {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export const SHIPPING_MODAL_DISMISSED_KEY = 'rag_shipping_modal_dismissed';

export const SHIPPING_OPTIONS: readonly [ShippingOption, ShippingOption, ShippingOption] = [
  {
    icon: 'ion:cube-outline',
    title: '¡Tienes productos pre aprobados!',
    description: 'Hazlos llegar para empezar su proceso',
    ctaLabel: 'Agendar aquí',
    href: '/contacto',
  },
  {
    icon: 'ion:storefront-outline',
    title: 'Drop off en Guadalajara',
    description:
      'TORRE HEREDIT\nJosé María Escrivá #, PB, 44660, Guadalajara, Jal.\nLunes a Viernes de 10:00 a 7:00\nSábados de 10:00 a 2:00',
    ctaLabel: 'Saber más',
    href: '/contacto',
  },
  {
    icon: 'ion:send-outline',
    title: 'Envío por paquetería',
    description: 'Cotiza tu guía',
    ctaLabel: 'Quiero enviar',
    href: '/contacto',
  },
];
