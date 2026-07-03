import type { CSSProperties } from 'react';

const DEFAULT_COLOR = '#F3F4F6';

const statusColors: Record<string, string> = {
  // solicitudes
  'en revisión': '#F2BC59',
  negociación: '#F3A25A',
  rechazada: '#EB6A6A',
  rechazado: '#EB6A6A',
  aprobada: '#DBE3F3',
  // publicaciones
  activa: '#81BD53',
  recibido: '#B5C7E7',
  'bolería p/c': '#966C90',
  bolería: '#B693B1',
  inactiva: '#E6E7E7',
  inactivar: '#E6E7E7',
  completado: '#E3EFD9',
  ingresado: '#99C9C9',
  autentificado: '#9594B6',
  heredit: '#B7B4DB',
  // ventas
  pagado: '#BDD57C',
  apartado: '#F0C8E0',
  'por pagar': '#FAF2A1',
  // devoluciones
  'por devolver': '#FCCC81',
  devuelto: '#F5B64E',
  donado: '#D89E49',
  // otros
  'apartado perdido': '#F2B186',
  'venta cancelada': '#D3DAE2',
  perdido: '#F2B186',
  cancelada: '#D3DAE2',
  venta: '#CCA0C2',
  pendiente: '#CD7352',
  liquidado: '#BDD57C',
  'pago parcial': '#FAF2A1',
  utilizado: '#FAF2A1',
  disponible: '#BDD57C',
};

function normalize(status: string): string {
  return status.trim().toLowerCase();
}

function darken(hex: string, factor: number): string {
  const channel = (start: number) => {
    const value = Math.round(parseInt(hex.slice(start, start + 2), 16) * factor);
    return value.toString(16).padStart(2, '0');
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
}

export function getStatusStyle(status: string): CSSProperties {
  const background = statusColors[normalize(status)] ?? DEFAULT_COLOR;
  return { backgroundColor: background, color: darken(background, 0.45) };
}
