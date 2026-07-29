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
