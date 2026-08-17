export interface ShippingOption {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  badge?: string;
  weekdayHours?: string;
  saturdayHours?: string;
}

export const SHIPPING_OPTIONS: readonly [ShippingOption, ShippingOption, ShippingOption] = [
  {
    icon: 'ion:cube-outline',
    title: '¡Tienes productos Pre Aprobados!',
    description: 'Hazlos llegar para empezar su proceso',
    ctaLabel: 'Agendar aquí',
    href: '/contacto',
  },
  {
    icon: 'ion:location-outline',
    title: 'Drop Off en Guadalajara',
    description:
      'Colinas de San Javier 2030-Local LC-1, Colinas de San Javier, 44660 Guadalajara, Jal.',
    ctaLabel: 'Saber más',
    href: '/contacto',
    badge: 'Torre Heredit',
    weekdayHours: 'Lunes a Viernes de 10:00 am a 7:00 pm',
    saturdayHours: 'Sábados de 10:00 am a 2:00 pm',
  },
  {
    icon: 'ion:cube-outline',
    title: 'Envío por paquetería',
    description: 'Cotiza tu guía',
    ctaLabel: 'Quiero enviar',
    href: `https://wa.me/523328071856?text=${encodeURIComponent('Hola! Quiero cotizar una guía para enviar mi producto')}`,
  },
];
