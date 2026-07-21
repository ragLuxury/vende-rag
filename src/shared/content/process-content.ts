export interface ProcessStep {
  readonly id: string;
  readonly step: number;
  readonly title: string;
  readonly heading: string;
  readonly body: string;
  readonly image: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'solicitudes',
    step: 1,
    title: 'Solicitudes',
    heading: 'Negociación de precios',
    body: 'Después de completar el formulario de venta, nuestro equipo te enviará una propuesta de precio en máximo 2 días hábiles. Al aceptar el precio y enviar tus productos a RAG, tus solicitudes se convertirán en publicaciones en nuestro sitio y podrás gestionarlas desde el Panel de Seller.',
    image: '/images/process-rag/solicitudes.png',
  },
  {
    id: 'autenticacion',
    step: 2,
    title: 'Autenticación',
    heading: 'Nuestro equipo de autentificación',
    body: 'Todos los productos recibidos pasan por un minucioso proceso de autenticación por medio de una revisión física y de un software de Inteligencia Artificial para asegurar que todo lo publicado en nuestro sitio sea auténtico.',
    image: '/images/process-rag/autenticacion.png',
  },
  {
    id: 'publicacion',
    step: 3,
    title: 'Publicación',
    heading: 'Verificamos y publicamos tu producto en RAG',
    body: 'Una vez que los productos pasan nuestro filtro de autenticación, tomamos fotografías y creamos contenido atractivo para su publicación. Nuestras estrategias de venta y promoción, tanto en plataformas físicas como digitales, maximizan la visibilidad y aumentan las posibilidades de concretar la venta.',
    image: '/images/process-rag/publicacion.png',
  },
  {
    id: 'pago',
    step: 4,
    title: 'Pago',
    heading: 'Condiciones únicas de pago',
    body: 'Los pagos a vendedores se hacen el siguiente martes tras la compra. Si el producto está apartado, recibes 30% y el 70% restante un mes después al liquidar el cliente. Somos la única plataforma que paga apartados antes de la liquidación. Si el cliente no paga, RAG cubre el monto restante.',
    image: '/images/process-rag/pago.png',
  },
];
